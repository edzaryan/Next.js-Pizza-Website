import { authOptions } from "@/shared/constants/auth-options";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/shared/lib/cloudinary";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth"; 


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const userId = Number(session.user.id);
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Delete old avatar
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.imageId) {
      try {
        await cloudinary.uploader.destroy(user.imageId);
      } catch (err) {
        console.warn("[UPLOAD_DELETE_OLD] Failed:", err);
      }
    }

    // Upload new avatar
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "cravemood" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(buffer);
    });

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        imageUrl: uploadResult.secure_url,
        imageId: uploadResult.public_id,
      },
    });

    return NextResponse.json({ imageUrl: updated.imageUrl });
  } catch (error) {
    console.log("[UPLOAD_POST] Server error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const userId = Number(session.user.id);

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.imageId) {
      try {
        await cloudinary.uploader.destroy(user.imageId);
      } catch (err) {
        console.warn("[UPLOAD_DELETE] Failed:", err);
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { imageUrl: null, imageId: null },
    });

    return NextResponse.json({ imageUrl: null });
  } catch (error) {
    console.log("[UPLOAD_DELETE] Server error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}

"use client"
import { Camera, ArrowUpToLine } from "lucide-react";
import { Api } from "@/shared/services/api-client";
import { getUserAvatar } from "@/shared/lib";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { Button } from "../../ui";
import Image from "next/image";


type ImageStatus = "none" | "exists" | "changed";

interface Props {
  initialImage: string | null;
}

export function ProfileImageUploader({ initialImage }: Props) {
  const [dbImage, setDbImage] = useState<string | null>(initialImage);
  const [image, setImage] = useState<string | null>(initialImage);
  const [status, setStatus] = useState<ImageStatus>(initialImage ? "exists" : "none");
  const { update } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setStatus("changed");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setImage(dbImage);
    setStatus(dbImage ? "exists" : "none");
  };

  const handleApply = async () => {
    try {
      if (!image || !image.startsWith("data:")) {
        console.error("No image or image is not base64");
        return;
      }

      const blob = await fetch(image).then((r) => r.blob());
      const file = new File([blob], "avatar.png", { type: blob.type });

      const url = await Api.upload.uploadAvatar(file);

      setDbImage(url);
      setImage(url);
      setStatus("exists");
      await update();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await Api.upload.deleteAvatar();

      setDbImage(null);
      setImage(null);
      setStatus("none");
      await update();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center select-none gap-5">
      <div className="flex flex-col justify-center items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <div
          onClick={openFileDialog}
          className="relative w-[190px] h-[190px] rounded-full cursor-pointer overflow-hidden
                     group border-[8px] border-gray-100 shadow-sm"
        >
          <Image
            src={getUserAvatar(image)}
            alt="User Avatar"
            fill
            className="object-cover"
            sizes="190px"
            priority
          />

          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/60 active:bg-black/70
                       transition-all duration-100"
          >
            <Camera
              size={35}
              color="#fff"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        <div className="mt-5 text-[16px] font-semibold">Profile Picture</div>
      </div>

      <div className="flex gap-3">
        {status === "none" && (
          <Button variant="secondary" onClick={openFileDialog}>
            <ArrowUpToLine size={16} />
            Upload
          </Button>
        )}

        {status === "exists" && (
          <>
            <Button onClick={handleDeleteAvatar}>Delete</Button>
            <Button variant="secondary" onClick={openFileDialog}>
              <ArrowUpToLine size={16} />
              Change
            </Button>
          </>
        )}

        {status === "changed" && (
          <>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button variant="secondary" onClick={handleApply}>
              Apply
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

"use client";
import { Camera, ArrowUpToLine } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { getUserAvatar } from "@/shared/lib";
import { Button } from "../../ui";
import Image from "next/image";

type ImageStatus = "none" | "exists" | "changed";

export function ProfileImageUploader() {
  const [dbImage, setDbImage] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(dbImage);
  const [status, setStatus] = useState<ImageStatus>(dbImage ? "exists" : "none");
  const { data: session } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setStatus("changed");
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setImage(dbImage);
    setStatus(dbImage ? "exists" : "none");
  };

  const handleApply = () => {
    setDbImage(image);
    setStatus("exists");
  };

  const handleDelete = () => {
    setDbImage(null);
    setImage(null);
    setStatus("none");
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center select-none gap-5">
      <div className="flex flex-col justify-center items-center">
        <input
          id="image-upload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <div className="relative w-[190px] h-[190px] rounded-full flex items-center justify-center 
          cursor-pointer overflow-hidden group select-none border-[8px] border-gray-100 shadow-sm"
          onClick={openFileDialog}
        >
          <Image
            src={getUserAvatar(image)}
            width={190}
            height={190}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/60 active:bg-black/70 transition-all duration-100"
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
            <Button onClick={handleDelete}>Delete</Button>
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

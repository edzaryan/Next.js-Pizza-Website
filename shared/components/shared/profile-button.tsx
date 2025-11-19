import { useSession } from "next-auth/react";
import { getUserAvatar } from "@/shared/lib";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

function truncateText(text: string, maxLength = 12) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export const ProfileButton = ({ className, onClickSignIn }: Props) => {
    const { data: session } = useSession();
    const isLoggedIn = !!session;

    return (
        <div className={className}>
            {isLoggedIn ? (
                <Link href="/profile" className="flex gap-2 justify-center items-center">
                    <Button
                        variant="secondary"
                        className="flex gap-2 justify-center items-center">
                        <Image 
                            src={getUserAvatar(session.user.imageUrl)}
                            width={29} 
                            height={29} 
                            alt="User Avatar" 
                            className="rounded-full w-auto h-auto" />
                        {truncateText(session.user.name)}
                    </Button>
                </Link>
            ) : (
                <Button 
                    variant="orangeOutline" 
                    className="flex items-center gap-[6px]"
                    onClick={onClickSignIn}
                >
                    <User size={17} />
                    Login
                </Button>
            )}
        </div>
    )
}
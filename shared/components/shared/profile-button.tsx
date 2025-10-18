import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

interface Props {
    onClickSignIn?: () => void;
    className?: string;
}

export const ProfileButton = ({ className, onClickSignIn }: Props) => {
    const { data: session } = useSession();
    const isLoggedIn = !!session;

    return (
        <div className={className}>
            {isLoggedIn ? (
                <Link href="/profile">
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2">
                        <CircleUser size={18} />
                        Profile
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
    );
};
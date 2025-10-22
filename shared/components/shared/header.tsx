"use client";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "./search-input";
import { AuthModal, ProfileButton } from ".";
import { useEffect, useState } from "react";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface Props { 
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        let toastMessage = "";

        if (searchParams.has("verified")) {
            toastMessage = "You have successfully verified your email!";
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace("/");
                toast.success(toastMessage, { duration: 3000 });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="logo" width={35} height={35} />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-5">Next-level flavor</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput className="flex-1" />
                    </div>
                )}
                
                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
                    {hasCart && <CartButton className="group relative" />}
                </div>
            </Container>
        </header>
    );
}


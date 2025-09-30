import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { User } from "lucide-react";
import { Button } from "../ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props { 
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
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
                    <Button variant="orangeOutline" className="flex items-center gap-[6px]">
                        <User size={17} />
                        Login
                    </Button>
                    {hasCart && <CartButton className="group relative" />}
                </div>
            </Container>
        </header>
    );
};


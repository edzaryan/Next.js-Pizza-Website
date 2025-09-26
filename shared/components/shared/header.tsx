import React from "react";
import { Container } from "./container";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props { 
    className?: string;
}

export const Header = ({ className }: Props) => {
    return (
        <header className={cn("border border-b", className)}>
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

                <div className="mx-10 flex-1">
                    <SearchInput className="flex-1" />
                </div>
                
                <div className="flex items-center gap-3">
                    <Button variant="orangeOutline" className="flex items-center gap-[6px]">
                        <User size={17} />
                        Login
                    </Button>
                    <CartButton className="group relative" />
                </div>
            </Container>
        </header>
    );
};


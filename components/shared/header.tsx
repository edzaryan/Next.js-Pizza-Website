import React from "react";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { ShoppingCart, ArrowRight, User } from "lucide-react";
import Image from "next/image";

interface Props { 
    className?: string;
}

export const Header = ({ className }: Props) => {
    return (
        <header className={cn("border border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                <div className="flex items-center gap-4">
                    <Image src="/logo.png" alt="logo" width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                        <p className="text-sm text-gray-400 leading-5">It couldn't be tastier</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="orangeOutline" className="flex items-center gap-[6px]">
                        <User size={16} strokeWidth={3} />
                        Login
                    </Button>
                    <div>
                        <Button className="group relative">
                            <b>520 ₽</b>
                            <span className="w-[1px] h-[20px] bg-white/40 mx-1" />
                            <div className="flex items-center gap-[6px] transition duration-300 group-hover:opacity-0">
                                <ShoppingCart className="relative" strokeWidth={3} />
                                <b>3</b>
                            </div>
                            <ArrowRight
                                strokeWidth={3}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};


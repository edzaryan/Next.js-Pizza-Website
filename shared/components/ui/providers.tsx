"use client";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
            <NextTopLoader 
                color="#f97316"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #f97316,0 0 5px #f97316"
            />
        </>
    )
}
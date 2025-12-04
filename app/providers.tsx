"use client"
import { CartInitializer } from "@/shared/components";
import { SessionProvider } from "next-auth/react";
import { store } from "@/shared/store/store";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <CartInitializer />

            <SessionProvider>
              {children}
            </SessionProvider>

            <UIProviders />
        </Provider>
    )
}

function UIProviders() {
  return (
    <>
      <Toaster />
      <NextTopLoader
        color="#f97316"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #f97316,0 0 5px #f97316"
      />
    </>
  )
}
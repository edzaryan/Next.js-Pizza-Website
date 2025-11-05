"use client"
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>{children}</SessionProvider>
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
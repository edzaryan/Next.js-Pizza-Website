import { InfoBlock } from '@/shared/components';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CRAVEMOOD | Access Denied",
  description: "You don't have permission to view this page"
}

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access Denied"
        text="This page can only be viewed by authorized users"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}
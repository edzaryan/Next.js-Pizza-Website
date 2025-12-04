import { ProfileForm } from "@/shared/components";
import { getUserProfile } from "@/app/actions";
import { redirect } from "next/navigation";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "CRAVEMOOD | Profile",
  description: "Manage your personal information and account settings."
}

export default async function ProfilePage() {
    const user = await getUserProfile();

    if (!user) {
        return redirect("/not-auth");
    }

    return <ProfileForm data={user} />
}
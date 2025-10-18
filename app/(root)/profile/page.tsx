import { redirect } from "next/navigation";
import { ProfileForm } from "@/shared/components";
import { getUserProfile } from "@/app/actions";

export default async function ProfilePage() {
    const user = await getUserProfile();

    if (!user) {
        return redirect("/not-auth");
    }

    return <ProfileForm data={user} />
}
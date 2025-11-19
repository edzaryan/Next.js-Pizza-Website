import { ProfileForm } from "@/shared/components";
import { getUserProfile } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getUserProfile();

    if (!user) {
        return redirect("/not-auth");
    }

    return <ProfileForm data={user} />
}
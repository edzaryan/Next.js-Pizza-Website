import { ResetPasswordConfirmForm } from "@/shared/components/shared/modals/auth-modal/forms/reset-password-confirm-form";


export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { token } = params;

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <ResetPasswordConfirmForm token={token} />
    </section>
  )
}

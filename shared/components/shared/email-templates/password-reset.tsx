
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const ResetPasswordEmailTemplate = ({ code }: { code: string }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
      maxWidth: "480px",
      margin: "0 auto",
    }}
  >
    <h2 style={{ textAlign: "center" }}>Reset Your Password 🔐</h2>

    <p>
      Hi! A request was made to reset your <strong>Next Pizza</strong> account password.
    </p>

    <p>If this was you, use the button below to set a new password.</p>

    <p style={{ textAlign: "center", margin: "24px 0" }}>
      <a
        href={`${BASE_URL}/reset-password?code=${code}`}
        style={{
          display: "inline-block",
          backgroundColor: "#ff4d4f",
          color: "white",
          padding: "12px 24px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        Reset Password
      </a>
    </p>

    <p>This link expires in <strong>10 minutes</strong>.</p>

    <p>If you didn’t request this, simply ignore the message.</p>

    <p style={{ marginTop: "28px", fontSize: "14px", color: "#555" }}>
      Or open the link directly:
      <br />
      <a
        href={`${BASE_URL}/reset-password?code=${code}`}
        style={{ color: "#ff4d4f", wordBreak: "break-all" }}
      >
        {`${BASE_URL}/reset-password?code=${code}`}
      </a>
    </p>

    <p style={{ marginTop: "30px", color: "#777" }}>
      — <strong>The Next Pizza Team</strong> 🍕
    </p>
  </div>
)


export const VerificationUserTemplate = ({ code }: { code: string }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
    }}
  >
    <h2>Welcome to Next Pizza! 🍕</h2>

    <p>
      Thank you for signing up! To get started, please verify your email
      address by clicking the button below.
    </p>

    <p style={{ margin: "24px 0" }}>
      <a
        href={`http://localhost:3000/api/auth/verify?code=${code}`}
        style={{
          display: "inline-block",
          backgroundColor: "#ff4d4f",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Verify Email
      </a>
    </p>

    <p style={{ fontSize: "14px", color: "#555" }}>
      This verification link will expire in 10 minutes.
    </p>

    <p>
      If you didn’t create an account with Next Pizza, you can safely ignore
      this email.
    </p>

    <p>Warm regards,<br />The Next Pizza Team</p>
  </div>
);

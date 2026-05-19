import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Link from "next/link";
import "../auth.css"; // Reuse elegant card/pattern designs

export const metadata = {
  title: "Admin Panel – Luxe Verve",
  description: "Luxe Verve Administrator Console.",
};

export default async function AdminPage() {
  const user = await getCurrentUser();

  // double check server-side protection (middleware handles this first)
  if (!user) {
    redirect("/sign-in?error=signin_first");
  }

  // Handle logout Server Action
  async function handleSignOut() {
    "use server";
    await signOut();
    redirect("/home");
  }

  return (
    <div className="auth-container" style={{ minHeight: "100vh" }}>
      <div className="auth-bg-pattern"></div>
      <div className="auth-card" style={{ maxWidth: "800px", width: "95%" }}>
        <div className="auth-header" style={{ marginBottom: "10px" }}>
          <span className="auth-logo-text" style={{ fontSize: "2.2rem" }}>
            Luxe Verve
          </span>
          <span className="auth-subtitle" style={{ fontSize: "1.2rem" }}>
            Administration Panel
          </span>
        </div>

        <div
          style={{
            borderBottom: "1px solid var(--border)",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h3
              className="serif-font"
              style={{
                fontSize: "1.6rem",
                color: "var(--text-main)",
                margin: 0,
              }}
            >
              Welcome, {user.name || "Administrator"}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "4px 0 0 0" }}>
              Logged in as: {user.email}
            </p>
          </div>

          <form action={handleSignOut}>
            <button
              type="submit"
              className="auth-button"
              style={{
                marginTop: 0,
                padding: "8px 20px",
                fontSize: "0.85rem",
                backgroundColor: "transparent",
                color: "var(--text-main)",
                borderColor: "var(--text-main)",
              }}
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Dashboard Grid - Mock visual presentation */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              padding: "20px",
              background: "rgba(248, 244, 238, 0.6)",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              Inquiries
            </span>
            <span
              style={{
                fontSize: "2rem",
                fontFamily: "var(--font-serif)",
                color: "var(--primary-color)",
                fontWeight: "bold",
                display: "block",
                marginTop: "5px",
              }}
            >
              12 Active
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              background: "rgba(248, 244, 238, 0.6)",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              Catalogue items
            </span>
            <span
              style={{
                fontSize: "2rem",
                fontFamily: "var(--font-serif)",
                color: "var(--primary-color)",
                fontWeight: "bold",
                display: "block",
                marginTop: "5px",
              }}
            >
              48 Designs
            </span>
          </div>

          <div
            style={{
              padding: "20px",
              background: "rgba(248, 244, 238, 0.6)",
              borderRadius: "12px",
              border: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
              }}
            >
              System Health
            </span>
            <span
              style={{
                fontSize: "1.2rem",
                fontFamily: "var(--font-serif)",
                color: "#2e7d32",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "12px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#2e7d32",
                  display: "inline-block",
                }}
              ></span>
              Operational
            </span>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Link
            href="/home"
            style={{
              color: "var(--primary-color)",
              fontSize: "0.9rem",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            Back to Public Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageContainer from "@/components/PageContainer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageContainer showCta={false}>
      <main
        style={{
          padding: "100px clamp(20px, 5vw, 64px) 120px",
          textAlign: "center",
        }}
        className="max-w-7xl mx-auto w-full"
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          404 — Page not found
        </div>

        <h1
          style={{
            margin: "20px 0 0",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(56px, 8vw, 120px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          Page not{" "}
          <span className="font-serif-italic brand-gradient-text">
            found.
          </span>
        </h1>

        <p
          style={{
            margin: "22px auto 0",
            maxWidth: "460px",
            fontSize: "17px",
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          The page you're looking for doesn't exist or has moved to a new URL.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "32px",
            padding: "14px 28px",
            borderRadius: "999px",
            background: "var(--grad)",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: 500,
            textDecoration: "none",
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Return to Home <span>→</span>
        </Link>
      </main>
    </PageContainer>
  );
};

export default NotFound;

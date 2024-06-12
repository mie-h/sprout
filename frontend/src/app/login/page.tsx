"use client";

import { useRouter } from "next/navigation";
import React from "react";

// TODO: Temporary ui. Build a sign in page ui
export default function Home() {
  const router = useRouter();

  const handleGoogleSignIn = () => {
    router.push("/api/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Sign In</h1>
        <button
          onClick={handleGoogleSignIn}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

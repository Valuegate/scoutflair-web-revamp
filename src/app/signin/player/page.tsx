// src/app/signin/player/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // we’ll still collect it as email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://scoutflair.top/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,   // ✅ send email as username
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ Save token for later requests
       if (data.jwtToken) {
  localStorage.setItem("authToken", data.jwtToken);
  console.log("Saved token:", data.jwtToken);
}

        router.push("/signin/player/dashboard");
      } else if (response.status === 401) {
        setError("Invalid credentials. Please check your email and password.");
      } else if (response.status === 403) {
        setError("Access forbidden. You don't have permission.");
      } else if (response.status === 404) {
        setError("Login service not found. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 min-w-[300px]">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
          disabled={loading}
        />

        {error && (
          <div className="text-red-600 text-sm mt-2 text-center">{error}</div>
        )}

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

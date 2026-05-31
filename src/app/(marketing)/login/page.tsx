"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("123");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) router.replace("/projects");
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      router.push("/projects");
    } else {
      setError("Invalid credentials. Demo: 123 / 123");
    }
  };

  if (isAuthenticated) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-outline-variant/50 bg-surface-container-low p-8">
        <Link href="/" className="font-headline-md text-primary hover:underline">
          ← AdAlchemy
        </Link>
        <h1 className="font-display-lg mt-6">Sign in</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Agency workspace — demo login <strong>123</strong> / <strong>123</strong>
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="font-label-sm text-on-surface-variant">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-2"
            />
          </div>
          <div>
            <label className="font-label-sm text-on-surface-variant">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-high px-4 py-2"
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-label-sm font-bold uppercase text-on-primary"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

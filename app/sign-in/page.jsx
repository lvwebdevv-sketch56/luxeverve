"use client";

import { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";

import { signIn } from "@/lib/actions/auth.action";
import "../auth.css";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "signin_first") {
      setShowWarning(true);
      toast.warning("Please sign in first to access the admin panel.", {
        id: "signin-warning",
      });
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;

      // Authenticate directly via Server Action
      const result = await signIn({ email, password });

      if (result && !result.success) {
        toast.error(result.message || "Failed to log in. Try again.");
        setLoading(false);
        return;
      }

      toast.success("Signed in successfully.");
      router.push("/ops.admin");
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-pattern"></div>
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo-text">Luxe Verve</span>
          <span className="auth-subtitle">Crafted Architectural Statements</span>
          <h2 className="auth-title">Sign In</h2>
        </div>

        {showWarning && (
          <div className="auth-banner-warning">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Please sign in first to access the admin panel.</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div className="form-input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="form-input"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="form-error-msg">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="form-input-wrapper">
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="form-input"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="form-error-msg">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don&apos;t have an account yet?</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="auth-link" style={{ cursor: 'not-allowed', opacity: 0.6 }}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="auth-container">
        <div className="auth-card" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
          <div className="spinner" style={{ borderTopColor: 'var(--primary-color)', width: '40px', height: '40px' }}></div>
        </div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}

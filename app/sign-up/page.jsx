"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";

import { signUp } from "@/lib/actions/auth.action";
import "../auth.css";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { name, email, password } = data;

      // Save user profile records to MongoDB via Server Action
      const result = await signUp({ name, email, password });

      if (!result.success) {
        toast.error(result.message || "Sign up failed. Please try again.");
        setLoading(false);
        return;
      }

      toast.success("Account created successfully. Please sign in.");
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign-up error:", error);
      toast.error("Failed to create account. Please try again.");
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
          <h2 className="auth-title">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <div className="form-input-wrapper">
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="form-input"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <span className="form-error-msg">{errors.name.message}</span>
            )}
          </div>

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

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="form-input-wrapper">
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="form-input"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <span className="form-error-msg">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link href="/sign-in" className="auth-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

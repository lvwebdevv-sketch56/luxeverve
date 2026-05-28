"use server";

import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { v4 as uuidv4 } from "uuid";

const SESSION_DURATION = 60 * 60 * 24 * 7;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_key_change_me");

// Set session cookie
export async function setSessionCookie(payload: any) {
  const cookieStore = await cookies();
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);

  cookieStore.set("session", token, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

type SignUpParams = {
  name: string;
  email: string;
  password?: string;
};

export async function signUp(params: SignUpParams) {
  const { name, email, password } = params;

  try {
    const client = await clientPromise;
    const mongoDb = client.db();

    // check if user exists in db
    const existingUser = await mongoDb.collection("users").findOne({ email });
    if (existingUser) {
      return { success: false, message: "This email is already in use" };
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : "";
    const uid = uuidv4();

    // save user to db
    await mongoDb.collection("users").insertOne({
      uid,
      name,
      email,
      password: hashedPassword,
    });

    return { success: true, message: "Account created successfully. Please sign in." };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { success: false, message: "Failed to create account. Please try again." };
  }
}

type SignInParams = {
  email: string;
  password?: string;
};

export async function signIn(params: SignInParams) {
  const { email, password } = params;

  try {
    const client = await clientPromise;
    const mongoDb = client.db();

    const userRecord = await mongoDb.collection("users").findOne({ email });
    if (!userRecord || !userRecord.password) {
      return { success: false, message: "Invalid credentials. Please verify your email and password." };
    }

    if (password) {
      const isPasswordValid = await bcrypt.compare(password, userRecord.password);
      if (!isPasswordValid) {
        return { success: false, message: "Invalid credentials. Please verify your email and password." };
      }
    }

    await setSessionCookie({ uid: userRecord.uid, email: userRecord.email });
    
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: "Failed to log into account. Please try again." };
  }
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

type User = {
  id: string;
  uid: string;
  name: string;
  email: string;
};

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const { payload } = await jwtVerify(sessionCookie, JWT_SECRET);
    if (!payload.uid) return null;

    const client = await clientPromise;
    const mongoDb = client.db();

    const userRecord = await mongoDb.collection("users").findOne({ uid: payload.uid });
    if (!userRecord) return null;

    return {
      id: userRecord.uid,
      uid: userRecord.uid,
      name: userRecord.name,
      email: userRecord.email,
    } as User;
  } catch (error) {
    console.log("Session verification failed", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

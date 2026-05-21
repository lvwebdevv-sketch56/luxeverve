import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

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
    <AdminDashboard user={user} handleSignOutAction={handleSignOut} />
  );
}


import {auth} from "@/app/_lib/auth";
export const metadata = {
  title: "Guest area",
  description: "Manage your account settings and preferences.",
};

export default async function AccountPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "Guest";
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {firstName}
      </h2>
    </div>
  );
}

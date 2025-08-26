import Link from "next/link";
export const metadata = {
  title: "Guest area",
  description: "Manage your account settings and preferences.",
};

export default function AccountPage() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your Account
      </h2>
    </div>
  );
}

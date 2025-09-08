import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return <div>
    <Spinner />
    <p className="text-primary-200 text-xl">Loading reservation...</p>
  </div>;
}

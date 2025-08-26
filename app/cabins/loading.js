import Spinner from "@/app/_components/Spinner";

export default function CabinsLoading() {
  return <div className="grid justify-center items-center h-full">
    <Spinner />
    <p className="text-primary-200 text-xl">Loading cabins...</p>
  </div>;
}

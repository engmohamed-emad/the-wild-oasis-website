import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";



export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({
        cabinId: String(cabin.id),
    }));
    return ids;
}


export async function generateMetadata({ params }) {
    const cabin = await getCabin(params.cabinId);
    const { name, description } = cabin;
    return {
        title: `Cabin ${name}`,
        description,
    };
}

export default async function Page({ params }) {
    const cabin = await getCabin(params.cabinId);
    const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

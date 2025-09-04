import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return <div>
    <Spinner />
  </div>;
}


// INSERT INTO bookings ("created_at", "startDate", "endDate", "numNights", "numGuests", "cabinPrice", "extrasPrice", "totalPrice" , "status", "isPaid", "observations", "guestId", "cabinId")
// SELECT "created_at", "startDate", "endDate", "numNights", "numGuests", "cabinPrice", "extrasPrice", "totalPrice" , "status", "isPaid", "observations", "guestId", "cabinId"
// FROM bookings
// WHERE id = 14;
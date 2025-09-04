"use server";
import {signIn, signOut} from "@/app/_lib/auth";
import {auth} from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData)
{
   const session = await auth();
   if(!session) {
      throw new Error("You must be logged in to update your profile.");
   }
   const [nationality, countryFlag] = formData.get("nationality").split("%");
   const nationalID = formData.get("nationalID");
   if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
      throw new Error("National ID must be 6-12 alphanumeric characters.");
   }
   const updatedGuest = {
      countryFlag,
      nationality,
      nationalID
   };
//   console.log("Updated guest:", updatedGuest);
  const { data, error } = await supabase
    .from('guests')
    .update(updatedGuest)
    .eq('id', session.user.guestId);

  if (error) {
    throw new Error('Guest could not be updated');
  }
  revalidatePath("/account/profile"); 
}


export async function deleteReservation(bookingId) {

   const session = await auth();
   if(!session) {
      throw new Error("You must be logged in to update your profile.");
   }
   
   const guestBookings = await getBookings(session.user.guestId);
   const guestBookingIds = guestBookings.map(booking => booking.id);
   if(!guestBookingIds.includes(bookingId)) {
      throw new Error("You do not have permission to delete this booking.");
   }
   const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    
    throw new Error('Booking could not be deleted');
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
   const session = await auth();
   if(!session) {
      throw new Error("You must be logged in to update your profile.");
   }

   const bookingId = Number(formData.get("bookingId"));

   const guestBookings = await getBookings(session.user.guestId);
   const guestBookingIds = guestBookings.map(booking => booking.id);
   if(!guestBookingIds.includes(bookingId)) {
      throw new Error("You do not have permission to update this booking.");
   }
   
   const numGuests = parseInt(formData.get("numGuests"));
   const observations = formData.get("observations").slice(0, 1000);

   const updatedBooking = {
      numGuests,
      observations
   };
   const { error } = await supabase
    .from('bookings')
    .update(updatedBooking)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    throw new Error('Booking could not be updated');
  }
   revalidatePath(`/account/reservations/edit/${bookingId}`);
   revalidatePath("/account/reservations");
   redirect("/account/reservations");
}


export async function signInAction() {
   await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
   await signOut({ redirectTo: "/" });
}
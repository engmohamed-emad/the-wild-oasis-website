"use client";
import React, { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteBooking} from '@/app/_lib/actions';
function ReservationList({bookings}) {
    
    const[opstimisticBookings, opstimisticDelete]= useOptimistic(bookings,(bookings, bookingId) =>{ return bookings.filter((booking) => booking.id !== bookingId)
    });
    async function handleDelete(bookingId) {
        opstimisticDelete(bookingId);
        await deleteBooking(bookingId);
    }
    return (
        <ul className="space-y-6">
          {opstimisticBookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
          ))}
        </ul>
    );
}

export default ReservationList;

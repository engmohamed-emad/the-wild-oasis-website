
"use client";
import { useState } from "react";
import { createContext, useContext } from "react";

const ReservationContext = createContext();
const initialRange = { from: undefined, to: undefined };
function ReservationProvider({ children }) {
 const [range, setRange] = useState(initialRange);
 const resetRange = () => setRange(initialRange);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}


function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
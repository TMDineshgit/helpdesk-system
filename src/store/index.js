import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./TicketSlices/ticketSlice";

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});

export default store;
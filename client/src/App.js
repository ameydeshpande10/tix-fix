import "./App.css";
import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

// Reducer
import { reducer, initialstate } from "./reducer/useReducer";

// Homepage
import { Movies } from "./pages/movie-path/movies-home/movie";

// Navbar
import { Navbar } from "./components/navbar/navbar";

// User-path
import { Signup } from "./pages/user-path/signup";
import { Login } from "./pages/user-path/login";
import { Logout } from "./pages/user-path/logout";
//User-path-show-details
import { UserDetails } from "./pages/user-path-details/user-details";
import { UserTickets } from "./pages//user-path-details/user-tickets";
//User-path-password-reset
import { ForgotPassword } from "./pages/user-path-password-reset/forgot-password";
import { ResetPassword } from "./pages/user-path-password-reset/reset-password";
//User-path-book-ticket
import { TicketBooking } from "./pages/user-path-ticket-booking/ticket-booking";
import { TicketPayment } from "./pages/user-path-ticket-booking/ticket-payment";

// Admin-path
import { AddMovie } from "./pages/admin-path/add-movie";
import { DeleteMovie } from "./pages/admin-path/delete-movie";
import { AddShows } from "./pages/admin-path/add-shows";

// Other
import { Aboutus } from "./pages/other/about-us";

// Mvoie-path
import { MovieDetails } from "./pages/movie-path/movie-details/movie-details";
import { UpcomingMovies } from "./pages/movie-path/movies-upcoming/upcoming-movies";
import { UpcomingMoviesDisplay } from "./pages/movie-path/movies-upcoming/upcoming-movies-display";

// Axios setup
axios.defaults.withCredentials = true;

//context api
export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/Movies" exact element={<Movies />} />
            <Route path="/" exact element={<Movies />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/user_details" element={<UserDetails />} />
            <Route path="/user_tickets" element={<UserTickets />} />
            <Route path="/About-us" element={<Aboutus />} />
            <Route path="/Upcoming_Movies" element={<UpcomingMovies />} />
            <Route
              path="/upcoming-movies"
              element={<UpcomingMoviesDisplay />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/delete-movie" element={<DeleteMovie />} />
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="/reset_password/" element={<ResetPassword />} />
            <Route path="/moviedetails/:id" element={<MovieDetails />} />
            <Route path="/book-ticket/:id" element={<TicketBooking />} />
            <Route path="/ticket-payment/:id" element={<TicketPayment />} />
            <Route path="/addshows/:id" element={<AddShows />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;

// <Route path="/bookticket/:id" element={<BookMySeats />} />

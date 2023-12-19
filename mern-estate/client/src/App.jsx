import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signup";
import Profile from "./pages/profile";
import About from "./pages/about";
import Header from "./components/header";
import PrivateRoute from "./components/privateRoute";
import CreateListing from "./pages/createListing";
import UpdateListing from "./pages/updateListing"

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/update-listing/:listingId" element={<UpdateListing />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

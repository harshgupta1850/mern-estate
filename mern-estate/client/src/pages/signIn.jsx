import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from "../redux/user/userSlice";

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { error, loading, currentUser } = useSelector((state) => state.user);
    console.log(currentUser, "current user from signin page");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data));
            navigate("/");
            console.log(data);
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    console.log(formData, "form data from sigin in page");

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSumbit}>
                <input
                    placeholder="Email"
                    type="text"
                    className="border p-3 rounded-lg"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                    disabled={loading}
                >
                    {loading ? "loading..." : "Sign In"}
                </button>
                <p className="text-red-700">{error && error}</p>
                <div className="flex gap-2 mt-4">
                    <p>Don't Have an Account?</p>
                    <Link to="/sign-up">
                        <span className="text-blue-700">Sign Up</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;

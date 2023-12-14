import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        const res = await fetch("/api/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);
        navigate('/sign-in')
        console.log(data);
    };

    console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSumbit}>
                <input
                    type="text"
                    placeholder="UserName"
                    className="border p-3 rounded-lg"
                    id="username"
                    onChange={handleChange}
                />
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
                    {loading ? "loading..." : "Sign Up"}
                </button>
                <p className="text-red-700">{error && error}</p>
                <div className="flex gap-2 mt-4">
                    <p>Have an Account?</p>
                    <Link to="/sign-in">
                        <span className="text-blue-700">Sign In</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;

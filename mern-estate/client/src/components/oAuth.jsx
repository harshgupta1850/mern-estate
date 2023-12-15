import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router";

function OAuth() {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, photoURL } = result?.user;
            dispatch(signInStart());
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: displayName,
                    email,
                    photo: photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigation("/");
        } catch (error) {
            console.log("could sign in with google", error);
        }
    };
    return (
        <button
            type="button"
            className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
            onClick={handleGoogleAuth}
        >
            Continue With google
        </button>
    );
}

export default OAuth;

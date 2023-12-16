import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getStorage,
    uploadBytesResumable,
    ref,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from "../redux/user/userSlice.js";

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { currentUser, loading, error } = user;
    const fileRef = useRef(null);
    const [file, setFile] = useState(null);
    const [filePercentage, setFilePercentage] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpadteSuccess] = useState(false);
    //firebase storage rule
    // allow read
    //   allow write: if
    //   request.resource.size <2*1024*1024 && request.resource.contentType.matches('image/*')
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePercentage(Math.round(progress));
            },
            (error) => setFileUploadError(true),
            () =>
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
                    setFormData({ ...formData, avatar: downloadUrl })
                )
        );
    };

    useEffect(() => {
        file && handleFileUpload(file);
    }, [file]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "applcation/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                return dispatch(updateUserFailure(data.message));
            }
            dispatch(updateUserSuccess(data));
            setUpadteSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success === false) {
                return dispatch(deleteUserFailure(data.message));
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <img
                    src={formData.avatar || currentUser.avatar}
                    className="rounded-full object-cover h-24 w-24 cursor-pointer self-center mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <p className="text-center">
                    {fileUploadError ? (
                        <span className="text-red-700">Error Image Upload</span>
                    ) : filePercentage > 0 && filePercentage < 100 ? (
                        <span>{`Uploaading ${filePercentage}%`}</span>
                    ) : filePercentage === 100 ? (
                        <span className="text-green-700">
                            Image Successfully Uploaded
                        </span>
                    ) : null}
                </p>
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                    type="text"
                    className="border p-3 rounded-lg"
                    placeholder="User name"
                    id="username"
                    defaultValue={currentUser?.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    className="border p-3 rounded-lg"
                    placeholder="Email"
                    id="email"
                    defaultValue={currentUser?.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="border p-3 rounded-lg"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                />
                <button
                    className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:80 p-3"
                    disabled={loading}
                >
                    {loading ? "Loading.........." : "update"}
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span
                    className="text-red-700 cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
            <p className="text-red-700">{error ? error : ""}</p>
            <p className="text-green-700">
                {updateSuccess ? "account update successfully" : ""}
            </p>
        </div>
    );
}

export default Profile;

import React, { useState } from "react";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";

function CreateListing() {
    const [file, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageSubmit = () => {
        if (file.length + formData.imageUrls.length < 7 && file.length > 0) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            for (let i = 0; i < file.length; i++) {
                promises.push(storeImage(file[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((error) => {
                    setImageUploadError("image upload failed");
                    setUploading(false);
                });
        } else {
            setImageUploadError("you can upload only 6 image");
            setUploading(false);
        }
    };

    const storeImage = (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress, "progrees");
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadUrl) => {
                            resolve(downloadUrl);
                        }
                    );
                }
            );
        });
    };

    const handleDeleteImage = (id) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== id),
        });
    };

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Create a Listing
            </h1>
            <form className="flex flex-col sm:flex-row gap-4 ">
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        placeholder="Name"
                        type="text"
                        className="border p-3 rounded-lg"
                        id="name"
                        minLength="10"
                        maxLength="62"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        type="text"
                        className="border p-3 rounded-lg"
                        id="description"
                        required
                    />
                    <input
                        placeholder="Address"
                        type="text"
                        className="border p-3 rounded-lg"
                        id="address"
                        required
                    />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="sell" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="parking"
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                className="w-5"
                                type="checkbox"
                                id="furnished"
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input className="w-5" type="checkbox" id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap  gap-6">
                        <div className="flex item-center gap-2">
                            <input
                                type="number"
                                id="bedrooms"
                                required
                                max="10"
                                min="1"
                                className="p-3 border-gray-300 rounded-lg"
                            />
                            <p>Beds</p>
                        </div>
                        <div className="flex item-center gap-2">
                            <input
                                type="number"
                                id="bathrooms"
                                required
                                max="5"
                                min="1"
                                className="p-3 border-gray-300 rounded-lg"
                            />
                            <p>Bath</p>
                        </div>
                        <div className="flex item-center gap-2">
                            <input
                                type="number"
                                id="regularPrice"
                                required
                                max="10"
                                min="1"
                                className="p-3 border-gray-300 rounded-lg"
                            />
                            <div className="flex flex-col item-center">
                                <p>Regular Price</p>
                                <span className="text-xs">($/month)</span>
                            </div>
                        </div>
                        <div className="flex item-center gap-2">
                            <input
                                type="number"
                                id="discountedPrice"
                                required
                                max="10"
                                min="1"
                                className="p-3 border-gray-300 rounded-lg"
                            />
                            <div className="flex flex-col item-center">
                                <p>Discounted Price</p>
                                <span className="text-xs">($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                        Images:
                        <span className="text-gray-600 ml-2">
                            The first image will be cover (Max 6)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className="p-3 border border-gray-300 rounded-lg w-full"
                            type="file"
                            id="image"
                            accept="image/*"
                            multiple
                        />
                        <button
                            className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                            onClick={handleImageSubmit}
                            type="button"
                            disabled={uploading}
                        >
                            {uploading ? "iploading....." : "upload"}
                        </button>
                    </div>
                    <p className="text-red-700">
                        {imageUploadError ? imageUploadError : ""}
                    </p>
                    {formData?.imageUrls?.map((imageUrl, index) => (
                        <div
                            className="flex justify-between p-3 border item-center"
                            key={imageUrl}
                        >
                            <img
                                src={imageUrl}
                                alt="listing image"
                                className="w-20 h-20 object-contain rounded-lg"
                            />
                            <button
                                type="button"
                                className="p-3 text-red-700 hover:opacity-75 rounded-lg uppercase"
                                onClick={() => handleDeleteImage(index)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                        Create List
                    </button>
                </div>
            </form>
        </main>
    );
}

export default CreateListing;

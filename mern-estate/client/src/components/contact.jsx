import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact(listing) {
    const [landordDetails, setLandlordDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const landlord = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `/api/user/${listing.listing?.userRef}`
                );
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                }
                setLoading(false);
                setLandlordDetails(data);
            } catch (error) {
                console.log(error);
            }
        };
        landlord();
    }, [listing?.listing?.userRef]);

    const handleMessage = (e) => setMessage(e.target.value);

    return (
        <div>
            {loading && <p>Loading Landlord Details</p>}
            {error && <p>Facing Error in fetching landlord Details</p>}
            {!loading && !error && landordDetails?.email && (
                <main>
                    <div className="flex flex-col gap-4">
                        <p>
                            Contact:{" "}
                            <span className="font-semibold">
                                {landordDetails?.username}
                            </span>{" "}
                            for{" "}
                            <span className="font-semibold">
                                {listing?.listing?.name}
                            </span>
                        </p>
                        <textarea
                            name="message"
                            id="message"
                            rows="2"
                            placeholder="Enter Your Message"
                            value={message}
                            onChange={handleMessage}
                            className="w-full border p-3 rounder-lg"
                            autoFocus
                        ></textarea>
                        <Link
                            to={`mailto:${landordDetails.email}?subject=Regarding ${listing?.listing?.name}&body=${message}`}
                            className="bg-slate-700 p-3 text-white text-center rounder-lg hover:opacity-95 uppercase"
                        >
                            Send Message
                        </Link>
                    </div>
                </main>
            )}
        </div>
    );
}

export default Contact;

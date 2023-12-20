import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

function Listing() {
    const params = useParams();
    SwiperCore.use([Navigation]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [listingDetails, setListingDetails] = useState({});
    useEffect(() => {
        const fetchListDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message, " Error in fetching list");
                    setError("No details Found");
                }
                setListingDetails(data);
                setLoading(false);
            } catch (error) {
                console.log(error, "error in fetching list");
            }
        };
        fetchListDetails();
    }, [params?.listingId]);
    console.log(listingDetails, "listingDetails");

    const renderCarasouel = () => (
        <Swiper navigation>
            {listingDetails?.imageUrls &&
                listingDetails?.imageUrls.map((url) => {
                    return (
                        <SwiperSlide key={url}>
                            <div
                                className="h-[550px]"
                                style={{
                                    background: `url(${url}) center no-repeat`,
                                    backgroundSize: "cover",
                                }}
                            ></div>
                        </SwiperSlide>
                    );
                })}
        </Swiper>
    );
    return (
        <main>
            {loading && (
                <p className="text-center text-3xl m-4">
                    We are fetching Listing Details
                </p>
            )}
            {error && (
                <p className="text-center text-3xl m-4">
                    We are having some issue in fetching list details
                </p>
            )}
            {listingDetails && !loading && !error && renderCarasouel()}
        </main>
    );
}

export default Listing;

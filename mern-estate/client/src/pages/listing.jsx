import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
    FaShare,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaParking,
    FaChair,
} from "react-icons/fa";

function Listing() {
    const params = useParams();
    SwiperCore.use([Navigation]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [listingDetails, setListingDetails] = useState({});
    const [copyText, setCopyText] = useState(false);

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

    const renderShareIcon = () => (
        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
                className="text-slate-500"
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopyText(true);
                    setTimeout(() => {
                        setCopyText(false);
                    }, 2000);
                }}
            />
            {copyText && (
                <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                    Link copied!
                </p>
            )}
        </div>
    );

    const renderAminites = () => (
        <ul className="flex text-green-900 font-semibold text-sm gap-4 flex-wrap">
            <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listingDetails?.bedrooms}{" "}
                {listingDetails.bedrooms > 1 ? "beds" : "bed"}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listingDetails?.bathrooms}{" "}
                {listingDetails.bedrooms > 1 ? "bathrooms" : "bathroom"}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listingDetails?.parking ? "Parking" : "No Parking"}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listingDetails?.furnished ? "Furnished" : "Not Furnished"}
            </li>
        </ul>
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
            {renderShareIcon()}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                <p className="text-2xl font-semibold">
                    {listingDetails.name} - ${" "}
                    {listingDetails.offer
                        ? listingDetails.discountedPrice
                        : listingDetails.regularPrice}
                    {listingDetails.type === "rent" && " / month"}
                </p>
                <p className="flex items-center mt-2 gap-2 text-slate-600  text-sm">
                    <FaMapMarkerAlt className="text-green-700" />
                    {listingDetails.address}
                </p>
                <div className="flex items-center gap-4">
                    <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg">
                        {listingDetails.type === "rent"
                            ? "For Rent "
                            : "For Sale"}
                    </p>
                    {listingDetails.offer && (
                        <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg">
                            $
                            {+listingDetails.regularPrice -
                                +listingDetails.discountedPrice}
                        </p>
                    )}
                </div>
                <p className=" text-slate-800">
                    <span className="font-semibold text-black">
                        Description -{" "}
                    </span>
                    {listingDetails.description}
                </p>
                {renderAminites()}
            </div>
        </main>
    );
}

export default Listing;

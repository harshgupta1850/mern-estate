import React from "react";

function Search() {
    return (
        <div className="flex flex-col md:flex-row ">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen ">
                <form className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Search Term:
                        </label>
                        <input
                            placeholder="...search"
                            type="text"
                            id="searchTerm"
                            className="border rounded-lg p-3 w-full"
                        />
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type: </label>
                        <div>
                            <input type="checkbox" id="all" className="w-5 mr-1" />
                            <span>Rent And Sell</span>
                        </div>
                        <div>
                            <input type="checkbox" id="rent" className="w-5 mr-1" />
                            <span>Rent</span>
                        </div>
                        <div>
                            <input type="checkbox" id="sell" className="w-5 mr-1" />
                            <span>Sell</span>
                        </div>
                        <div>
                            <input type="checkbox" id="offer" className="w-5 mr-1" />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 flex-wrap items-center">
                        <label className="font-semibold">Aminites: </label>
                        <div>
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                            />
                            <span>Parking</span>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className="flex  gap-2  items-center">
                        <label className="font-semibold">Sort: </label>
                        <div>
                            <select
                                id="sort_order"
                                className="border rounded-lg p-3"
                            >
                                <option>Proce High to low</option>
                                <option>Proce low to high</option>
                                <option>Latest</option>
                                <option>Oldest</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-slate-700 p-3 w-full text-white rounded-lg hover:opacity-95 uppercase">
                        Search
                    </button>
                </form>
            </div>
            <div>
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 m-5">
                    Listing Results:
                </h1>
            </div>
        </div>
    );
}

export default Search;
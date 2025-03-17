'use client'
import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "@/features/shopSlice";
import { addWishlist } from "@/features/wishlistSlice";
import ShopCard3 from "./ShopCard3";

const FilterShopBox2 = () => {
    const [popularProducts, setPopularProducts] = useState([]);

   // Fetch only popular products from API
    useEffect(() => {
        fetch("http://localhost:5000/popularproducts/")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Popular Products:", data); // ✅ Log data to check API response
                setPopularProducts(data);
            })
            .catch((error) => console.error("Error fetching popular products:", error));
    }, []);


    return (
        <>
            {popularProducts.length > 0 ? (
                popularProducts.map((item, i) => (
                    <Fragment key={i}>
                        <ShopCard3 item={item} />
                    </Fragment>
                ))
            ) : (
                <p>No popular products found.</p>
            )}
        </>
    );
};

export default FilterShopBox2;

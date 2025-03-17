"use client";  // ✅ Add this to mark as Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";  // ✅ Use `next/navigation` for App Router
import { useEffect, useState } from "react";
import { 
    FaAppleAlt, FaCheese, FaDrumstickBite, FaShoppingBasket, FaFish, 
    FaCocktail, FaBroom, FaScroll, FaLemon, FaSnowflake 
} from "react-icons/fa";

import { GiMeat} from "react-icons/gi"; 

export default function Category() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in (Assuming user info is stored in localStorage)
    useEffect(() => {
        const user = localStorage.getItem("user");  
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    // Handle category click
    const handleCategoryClick = () => {
        if (isLoggedIn) {
            router.push("/shop-2");
        } else {
            router.push("/sign-in");
        }
    };

    return (
        <section className="category-area pt-20">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tpsection mb-40">
                            <h4 className="tpsection__title">
                                Top <span>Categories</span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="custom-row category-border pb-80 justify-content-xl-between">
                    {/* Categories */}
                    <div className="row">
                        {[
                            { icon: <FaAppleAlt size={40} />, name: "Fresh Produce" },
                            { icon: <FaCheese size={40} />, name: "Dairy & Perishables" },
                            { icon: <FaDrumstickBite size={40} />, name: "Deli Meats & Sausages" },
                            { icon: <FaShoppingBasket size={40} />, name: "Dry Groceries" },
                            { icon: <GiMeat size={40} />, name: "Fresh & Frozen Meats" },
                            { icon: <FaCocktail size={40} />, name: "Beverages & Mixes" },
                            { icon: <FaBroom size={40} />, name: "Janitorial Supplies" },
                            { icon: <FaScroll size={40} />, name: "Paper & Disposables" },
                            { icon: <FaFish size={40} />, name: "Fresh & Frozen Seafood" },
                            { icon: <FaSnowflake size={40} />, name: "Fresh & Frozen Foods" }
                        ].map((category, index) => (
                            <div key={index} className="col-md-2 col-sm-6 mb-40 mr-35">
                                <div className="tpcategory" onClick={handleCategoryClick} style={{ cursor: "pointer" }}>
                                    <div className="tpcategory__icon">{category.icon}</div>
                                    <div className="tpcategory__content ml-20">
                                        <h5>{category.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CartShow from "@/components/elements/CartShow";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/shopSlice"; // Import clearCart action

// import HeaderMobSticky from "../HeaderMobSticky";
// import HeaderSticky from "../HeaderSticky";
// import HeaderTabSticky from "../HeaderTabSticky";

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isCartSidebar, handleCartSidebar }) {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Check if we are on the homepage
    // const isHomePage = router.pathname === "/";

   
    const dispatch = useDispatch(); // Import useDispatch from react-redux

    // Check if user is logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user"); // Remove corrupted data

                dispatch(clearCart()); // Dispatch clearCart action

            }
        }
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        // localStorage.removeItem("local-cart");
        setUser(null);
        setDropdownOpen(false); // Close dropdown after logout

        dispatch(clearCart())


        router.push("/sign-in");
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header>
                <div className="logo-area mt-6 d-none d-xl-block">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-3 col-lg-3">
                                <div className="logo">
                                    <Link href="/"><img src="/assets/img/svg/logo.png" alt="logo" /></Link>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="header-meta-info d-flex align-items-center justify-content-center mb-20">
                                    <div className="main-menu">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li><Link href="/">Home</Link></li>
                                                <li className="has-dropdown">
                                                    <Link href="#">Products</Link>
                                                    <ul className="submenu">
                                                        <li><Link href="/shop-2">Fresh Produce</Link></li>
                                                        <li><Link href="/shop-2">Dairy & Perishables</Link></li>
                                                        <li><Link href="/shop-2">Deli Meats & Sausages</Link></li>
                                                        <li><Link href="/shop-2">Dry Groceries</Link></li>
                                                        <li><Link href="/shop-2">Fresh & Frozen Meats</Link></li>
                                                        <li><Link href="/shop-2">Beverages & Mixes</Link></li>
                                                        <li><Link href="/shop-2">Janitorial Supplies</Link></li>
                                                        <li><Link href="/shop-2">Paper & Disposables</Link></li>
                                                        <li><Link href="/shop-2">Fresh & Frozen Seafoods</Link></li>
                                                        <li><Link href="/shop-2">Frozen Foods</Link></li>
                                                    </ul>
                                                </li>
                                                {isHomePage ? (
                                                    <li><Link href="#about">About</Link></li>
                                                ) : (
                                                    <li><Link href="/">About</Link></li>
                                                )}
                                                {/* <li style={{ marginLeft: "-5%" }}> 
                                                    <div className="tpbanneritem__btn">
                                                        <Link className="tp-btn green-btn" href="/contact">
                                                            Contact Us
                                                        </Link>
                                                    </div>
                                                </li> */}
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3">
                                
                                <div className="header-meta-info d-flex align-items-center justify-content-between">
                                    <div className="header-meta header-brand d-flex align-items-center">
                                        <div className="header-meta__social d-flex align-items-center ml-25">
                                            
                                            <div className="tpbanneritem__btn" >
                                                <Link className="tp-btn green-btn" href="/contact">
                                                    Contact Us
                                                </Link>
                                            </div>

                                            <button className="header-cart p-relative tp-cart-toggle" style={{ marginLeft: "20px" }} onClick={handleCartSidebar}>
                                                <i className="fal fa-shopping-cart" />
                                                <CartShow />
                                            </button>

                                            
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <HeaderSticky scroll={scroll} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> */}
            {/* <HeaderTabSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> */}
            {/* <HeaderMobSticky scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isCartSidebar={isCartSidebar} handleCartSidebar={handleCartSidebar} /> */}
        </>
    );
}

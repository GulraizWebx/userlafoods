"use client"; // ✅ Ensure it's a Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Countdown from "../elements/CountDown";

export default function DealProduct1() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status
    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user); // Convert to boolean
    }, []);

    // Handle redirection for "View In Store Products" button
    const handleRedirect = () => {

        router.push("/shop-2");
        // if (isLoggedIn) {
        //     router.push("/shop-2");
        // } else {
        //     router.push("/sign-in");
        // }
    };

    const currentTime = new Date();
    
    return (
        <>
            <div className="btn_center">
                {/* ✅ Updated button with onClick event */}
                <button className="tpteam__btn" onClick={handleRedirect}>
                    View In Store Products
                </button>
            </div>

            <section className="feature-area pt-70 pb-10" id="about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="tpfeature__inner-thumb mb-70">
                                <img src="/assets/img/banner/aboutus2.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="tpabout__inner-title-area about-inner-content ml-50 mr-50 mb-70">
                                <h4 className="tpabout__inner-title mb-25">About Us</h4>
                                <div className="mb-25">
                                Now Providing Home Deliveries in The Los Angeles Area with No Account Setup or Business License Required. LA Foodservice is a local family-owned and operated personalized solution for your restaurant supply and delivery needs. We help you save time, money, and effort by consolidating your current vendors to our full line service. Please contact us today to set up your free consultation and custom presentation. We have recently opened to the public for home delivery. Shop page with cart currently under construction. Thank you!
                                </div>
                                {/* <Link className="tpteam__btn" href="#">Membership Signup</Link> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="tpbanneritems p-relative">
                            <div className="tpbanneritem__thumb home_thumb">
                                <img src="/assets/img/banner/monthly_flyer.jpg" alt="banner-img" style={{ width: "100%", height: "200px", objectFit: "cover" }}   />
                                <div>
                                <div className="tp-breadcrumb tp_title">
                                    <div className="tp-breadcrumb__link mb-10"></div>
                                    <h2 className="tp-breadcrumb__title tp_title_text">Create your business Account</h2>
                                </div>
                                <div className="tpbanneritem__content btn_content">
                                    <div className="tpbanneritem__btn">
                                        <Link className="tp-btn green-btn banner-animation" href="#">
                                        Download the credit app<i className="fal fa-long-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

"use client"; // ✅ Ensure it's a Client Component

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Countdown from "../elements/CountDown";

export default function HomeSupply() {
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
                <h4 class="tpabout__inner-title pt-40 " style={{color:'#FBCC34' }}>The Best Solution for Your Restaurant & Home Supply Needs</h4>
            </div>

            <section className="feature-area pt-40">
                <div className="container">
                    <div className="row align-items-center">
                        
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="tpabout__inner-title-area about-inner-content ml-50 mr-50 mb-70">
                                <h5 className="tpabout__inner-title mb-25">LA Foodservice Wholesale Free Next Day Delivery is your new personalized shopping solution</h5>
                                <div className="mb-25">
                                Let the professionals handle your groceries, amazing customer service, easy ordering, quick turnaround times in refrigerated trucks with whiteglove delivery with far better prices & quality than in the store!!
                                <br /><br />
                                Ready to order like a pro? You can manually fill out your order below and submit it for next day delivery, pay when you product arrives.
                                <br /><br />
                                Want to use a cart feature? click shop at the top of the page to utilize our easy fill cart checkout.
                                </div>
                                {/* <Link className="tpteam__btn" href="#">Membership Signup</Link> */}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="tpfeature__inner-thumb mb-70">
                                <img src="/assets/img/banner/aboutus3.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

               
            </section>
        </>
    );
}

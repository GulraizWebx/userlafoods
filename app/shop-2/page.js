"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import FilterShopBox from "@/components/shop/FilterShopBox";
import FilterSidebar from "@/components/shop/FilterSidebar";

export default function Shop2() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status
    // useEffect(() => {
    //     const user = localStorage.getItem("user");
    //     if (!user) {
    //         router.push("/sign-in"); // Redirect if not logged in
    //     } else {
    //         setIsLoggedIn(true);
    //     }
    // }, [router]);

    // Prevent rendering until login status is checked
    // if (!isLoggedIn) {
    //     return null;
    // }

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Products">
            <div className="product-area pt-70 pb-20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-12">
                            <div className="tpsidebar product-sidebar__product-category">
                                <FilterSidebar />
                            </div>
                        </div>
                        <div className="col-lg-10 col-md-12">
                            <div className="product-sidebar__product-item">
                                <FilterShopBox itemStart={10} itemEnd={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

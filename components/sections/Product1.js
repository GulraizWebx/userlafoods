'use client'
import { useState, useEffect } from "react";
import FilterShopBox3 from "../shop/FilterShopBox3";

export default function Product1() {
    const [popularProducts, setPopularProducts] = useState([]);

    // Fetch only popular products
    useEffect(() => {
        fetch("http://localhost:5000/popularproducts/") // Your API for fetching popular products
            .then((res) => res.json())
            .then((data) => setPopularProducts(data))
            .catch((error) => console.error("Error fetching popular products:", error));
    }, []);

    return (
        <section className="product-area pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="tpsection mb-40">
                            <h4 className="tpsection__title">Popular <span> Products <img src="/assets/img/icon/title-shape-01.jpg" alt="" /></span></h4>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                    <FilterShopBox3 products={popularProducts} />
                </div>
            </div>
        </section>
    );
}

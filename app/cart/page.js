"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import CartItems from "@/components/elements/CartItems";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

export default function Cart() {
    const { cart } = useSelector((state) => state.shop) || {};

    // Function to calculate final price with product percentage
    const calculateFinalPrice = (price, percentage) => {
        let numericPrice = price ? parseFloat(price.toString().replace(/[^0-9.]/g, "")) || 0 : 0;
        let productPercentage = percentage ? parseFloat(percentage) || 0 : 0;

        return numericPrice + (numericPrice * productPercentage) / 100;
    };

    // Calculate Subtotal and Total
    let total = cart?.reduce((sum, item) => {
        let selectedPrice = item.case_price > 0
            ? calculateFinalPrice(item.case_price, item.product_percentage)
            : calculateFinalPrice(item.unit_price, item.product_percentage);

        return sum + (item.qty || 0) * selectedPrice;
    }, 0);

    return (
        <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Cart">
            <section className="cart-area pt-80 pb-80 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <form action="#">
                                <div className="table-content table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail">Images</th>
                                                <th className="cart-product-name">Courses</th>
                                                <th className="product-price">Case Price</th>
                                                <th className="product-price">Unit Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                                <th className="product-remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CartItems />
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row justify-content-end">
                                    <div className="col-md-5">
                                        {/* Cart Totals */}
                                        <div className="cart-page-total">
                                            <h2>Cart totals</h2>
                                            <ul className="mb-20">
                                                <li>Subtotal <span>{total > 0 ? `$${total.toFixed(2)}` : "N/A"}</span></li>
                                                <li>Total <span>{total > 0 ? `$${total.toFixed(2)}` : "N/A"}</span></li>
                                            </ul>
                                            <Link href="/checkout" className="tp-btn tp-color-btn banner-animation">Proceed to Checkout</Link>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

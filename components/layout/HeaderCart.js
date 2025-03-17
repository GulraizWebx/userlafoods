'use client'
import { addQty, deleteCart } from "@/features/shopSlice"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function HeaderCart({ isCartSidebar, handleCartSidebar }) {
    const { cart } = useSelector((state) => state.shop) || {}
    const [cartItems, setCartItems] = useState([])

    // console.log(cartItems);

    const dispatch = useDispatch()

    // Delete cart item
    const deleteCartHandler = (id) => {
        dispatch(deleteCart(id));
        sessionStorage.removeItem(`cartItem_${id}`); // Remove from session storage as well
    }

    useEffect(() => {
        const updatedCart = cart?.map((item) => {
            const storedCartItem = sessionStorage.getItem(`cartItem_${item.id}`);

            const selectedPrice = storedCartItem
                ? JSON.parse(storedCartItem).selectedPrice
                : item.case_price || item.unit_price; // Default to one if not set
    
                console.log(selectedPrice);
            return {
                ...item,
                selectedPrice: selectedPrice,
            };
        });
    
        // console.log(updatedCart);
        setCartItems(updatedCart);
    }, [cart]);
    

 // Calculate totals
 let total = 0;
 cartItems?.forEach((item) => {
     const itemPrice = parseFloat(item.selectedPrice) || 0;
     total += (item.qty || 0) * itemPrice;
 });

    
    return (
        <>
            <div className={`tpcartinfo tp-cart-info-area p-relative ${isCartSidebar ? "tp-sidebar-opened" : ""}`}>
                <button className="tpcart__close" onClick={handleCartSidebar}><i className="fal fa-times" /></button>
                <div className="tpcart">
                    <h4 className="tpcart__title">Your Cart</h4>
                    <div className="tpcart__product">
                        <div className="tpcart__product-list">
                            <ul>
                                {cartItems?.map((item, i) => (
                                    <li key={i}>
                                        <div className="tpcart__item">
                                            <div className="tpcart__img">
                                                <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.product_name} />
                                                <div className="tpcart__del" onClick={() => deleteCartHandler(item.id)}>
                                                    <Link href="#"><i className="far fa-times-circle" /></Link>
                                                </div>
                                            </div>
                                            <div className="tpcart__content">
                                                <span className="tpcart__content-title">
                                                    <Link href="/shop-details">{item.product_name}</Link>
                                                </span>
                                                <div className="tpcart__cart-price">
                                                    <span className="quantity">{item.qty} x </span>
                                                    <span>$
                                                        {item.selectedPrice}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="tpcart__checkout">
                            <div className="tpcart__total-price d-flex justify-content-between align-items-center">
                                <span>Subtotal:</span>
                                <span className="heilight-price">${total.toFixed(2)}</span>
                                
                            </div>
                            <div className="tpcart__checkout-btn">
                                <Link className="tpcart-btn mb-10" href="/cart">View Cart</Link>
                                <Link className="tpcheck-btn" href="/checkout">Checkout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="tpcart__free-shipping text-center">
                        <span>Free shipping for orders <b>under 10km</b></span>
                    </div>
                </div>
            </div>
            <div className={`cartbody-overlay ${isCartSidebar ? "opened" : ""}`} onClick={handleCartSidebar} />
        </>
    )
}

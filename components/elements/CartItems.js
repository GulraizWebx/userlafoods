"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addQty, deleteCart } from "@/features/shopSlice";

const CartItems = () => {
    const { cart } = useSelector((state) => state.shop) || {};
    const dispatch = useDispatch();

    // Delete cart item
    const deleteCartHandler = (id) => {
        dispatch(deleteCart(id));
    };

    // Quantity handler
    const qtyHandler = (id, qty) => {
        dispatch(addQty({ id, qty }));
    };

    // Function to calculate the final price with the product percentage
    const calculateFinalPrice = (price, percentage) => {
        let numericPrice = price ? parseFloat(price.toString().replace(/[^0-9.]/g, "")) || 0 : 0;
        let productPercentage = percentage ? parseFloat(percentage) || 0 : 0;

        return numericPrice + (numericPrice * productPercentage) / 100;
    };

    // Calculate Grand Total
    let grandTotal = cart?.reduce((sum, item) => {
        // Decide which price to use (case price or unit price)
        let finalPrice = item.case_price > 0 
            ? calculateFinalPrice(item.case_price, item.product_percentage) 
            : calculateFinalPrice(item.unit_price, item.product_percentage); // Use unit price if case price is 0

        return sum + (item.qty || 0) * finalPrice;
    }, 0);

    return (
        <>
            {cart?.map((item) => {
                // Calculate case price and unit price with percentage
                let finalCasePrice = item.case_price > 0 
                    ? calculateFinalPrice(item.case_price, item.product_percentage) 
                    : 0;
                
                let finalUnitPrice = item.unit_price > 0 
                    ? calculateFinalPrice(item.unit_price, item.product_percentage) 
                    : 0;

                // Determine which price to use for calculation
                let selectedPrice = item.case_price > 0 ? finalCasePrice : finalUnitPrice;
                let itemTotal = (item.qty || 0) * selectedPrice;

                return (
                    <tr className="cart-item" key={item.id}>
                        <td className="product-thumbnail">
                            <Link href={`/shop/${item.id}`}>
                                <img src={`http://localhost:5000/uploads/${item.image}`} alt="cart added product" />
                            </Link>
                        </td>

                        <td className="product-name">
                            <Link href={`/shop/${item.id}`}>
                                {item.product_name}
                            </Link>
                        </td>

                        {/* Case Price Column */}
                        <td className="product-price">
                            {item.case_price > 0 ? `$${finalCasePrice.toFixed(2)}` : "N/A"}
                        </td>

                        {/* Unit Price Column */}
                        <td className="product-price">
                            {item.unit_price > 0 ? `$${finalUnitPrice.toFixed(2)}` : "N/A"}
                        </td>

                        <td className="product-quantity">
                            <div className="item-quantity">
                                <input
                                    type="number"
                                    className="qty"
                                    name="qty"
                                    defaultValue={item.qty}
                                    min={1}
                                    onChange={(e) => qtyHandler(item.id, e.target.value)}
                                />
                            </div>
                        </td>

                        {/* Item Total - Based on Case Price if Available, Otherwise Unit Price */}
                        <td className="product-subtotal"> 
                            <span className="amount">
                                ${itemTotal.toFixed(2)}
                            </span>
                        </td>

                        {/* Remove Item */}
                        <td className="product-remove">
                            <button onClick={() => deleteCartHandler(item.id)} className="remove">
                                <span className="flaticon-dustbin">Remove</span>
                            </button>
                        </td>
                    </tr>
                );
            })}

            {/* Grand Total Row */}
            <tr className="cart-total">
                <td colSpan="5"></td>
                <td className="total-price">
                    <strong>Total:</strong> 
                    <span className="heilight-price">${grandTotal.toFixed(2)}</span>
                </td>
            </tr>
        </>
    );
};

export default CartItems;

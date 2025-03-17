'use client'
import Layout from "@/components/layout/Layout"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import Link from "next/link";
import { toast } from "react-toastify";
import { reloadCart, clearCart  } from "@/features/shopSlice";

export default function Checkout() {
    const dispatch = useDispatch();
    const router = useRouter(); // ✅ Initialize Next.js router
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         try {
    //             setUser(JSON.parse(storedUser));
    //         } catch (error) {
    //             console.error("Error parsing user data:", error);
    //             localStorage.removeItem("user");
    //         }
    //     } else {
    //         router.push("/sign-in"); // ✅ Redirect to sign-in if no user is found
    //     }
    // }, []);

    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [showCartDetails, setShowCartDetails] = useState(false);
    const [phone, setPhone] = useState("");

    const { cart } = useSelector((state) => state.shop) || {};
    const [selectedOption, setSelectedOption] = useState(null);

    const [name, setName] = useState("");
const [email, setEmail] = useState("");

    // console.log(selectedOption);


    useEffect(() => {
        const updatedSelection = cart?.map((item) => {
            const storedCartItem = sessionStorage.getItem(`cartItem_${item.id}`);
    
            let selectedPriceType = "Case Price"; // Default to Case Price
            let selectedPrice = item.case_price; // Default to case price
    
            if (storedCartItem) {
                const parsedItem = JSON.parse(storedCartItem);
                selectedPriceType = parsedItem.selectedPriceType;
                selectedPrice = parsedItem.selectedPrice;
            } else if (!item.case_price) {
                selectedPriceType = "Unit Price";
                selectedPrice = item.unit_price;
            }
    
            return { selectedPriceType, selectedPrice };
        });
    
        setSelectedOption(updatedSelection);
    }, [cart]);
    
    

    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.unit_price * item.qty, 0);

    const shippingCost = 0.00;
    const orderTotal = subtotal + shippingCost;

    const [isLoginToggle, setLoginToggle] = useState(false);
    const handleLoginToggle = () => setLoginToggle(!isLoginToggle);

    const [isCuponToggle, setCuponToggle] = useState(false);
    const handleCuponToggle = () => setCuponToggle(!isCuponToggle);

    const [isCboxToggle, setCboxToggle] = useState(false);
    const handleCboxToggle = () => setCboxToggle(!isCboxToggle);

    const [isShipToggle, setShipToggle] = useState(false);
    const handleShipToggle = () => setShipToggle(!isShipToggle);

    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    });

    useEffect(() => {
        dispatch(reloadCart()); // Load cart from localStorage on page load
    }, [dispatch]);

    // Function to calculate final price with product percentage
const calculateFinalPrice = (price, percentage) => {
    let numericPrice = price ? parseFloat(price.toString().replace(/[^0-9.]/g, "")) || 0 : 0;
    let productPercentage = percentage ? parseFloat(percentage) || 0 : 0;

    return numericPrice + (numericPrice * productPercentage) / 100;
};

    // Calculate total
let total = cart?.reduce((sum, item) => {
    let selectedPrice = item.case_price > 0
        ? calculateFinalPrice(item.case_price, item.product_percentage)
        : calculateFinalPrice(item.unit_price, item.product_percentage);

    return sum + (item.qty || 0) * selectedPrice;
}, 0);

   // Handle Order Submission
const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
        name: name, // Added Name
        email: email, // Added Email
        cart: JSON.stringify(cart),
        cart_total: total,
        shipping_type: "Delivery",
        shipping_cost: shippingCost,
        total_price: total,
        delivery_address: deliveryAddress,
        delivery_date: deliveryDate,
        delivery_time: deliveryTime,
        phone: phone,
    };

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();

        if (response.ok) {
            toast.success("Order placed successfully!", { autoClose: 3000 });

            // ✅ Clear Cart in Redux and Local Storage
            dispatch(clearCart());

            // ✅ Redirect to Order Success Page
            router.push("/"); 

            // ✅ Reset Form Fields
            setName(""); // Reset Name
            setEmail(""); // Reset Email
            setDeliveryAddress("");
            setDeliveryDate("");
            setDeliveryTime("");
            setPhone("");
        } else {
            alert("Failed to place order: " + result.message);
        }
    } catch (error) {
        console.error("Error submitting order:", error);
        alert("Something went wrong. Please try again.");
    }
};

    

    const handleClick = (key) => {
        if (isActive.key === key) {
            setIsActive({ status: false });
        } else {
            setIsActive({ status: true, key });
        }
    };

    return (
        <>


<style jsx>{`
    .checkbox-form {
        background: #f8f8f8;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .checkbox-form h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    
    .checkout-form-list {
        margin-bottom: 15px;
    }
    
    .checkout-form-list label {
        font-size: 14px;
        font-weight: 500;
        display: block;
        margin-bottom: 5px;
        color: #333;
    }
    
    .checkout-form-list input,
    .checkout-form-list select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        background: #fff;
    }
    
    .checkout-form-list input:focus,
    .checkout-form-list select:focus {
        border-color: #FBCC34;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
    }
    
    .row {
        display: flex;
        flex-wrap: wrap;
        margin: -10px;
    }
    
    .col-md-6, .col-md-12 {
        padding: 10px;
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
        .col-md-6 {
            width: 100%;
        }
    }

    .confirm-order-container {
    text-align: center;
    margin-top: 20px;
}

.confirm-order-btn {
    background-color: #FBCC34;
    color: #fff;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
    width: 100%;
}

.confirm-order-btn:hover {
    background-color: #FBCC34;
}

.your-order {
    border: 1px solid #ddd;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
}

.order-summary {
    padding: 15px;
    background: white;
    border-radius: 8px;
    margin-bottom: 15px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
}

.summary-item.total {
    font-size: 18px;
    font-weight: bold;
    color: #FBCC34;
}

.confirm-order-btn {
    width: 100%;
    padding: 12px;
    background: #FBCC34;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 15px;
}

.confirm-order-btn:hover {
    background: #FBCC34;
}

.cart-faq {
    margin-top: 20px;
}

.faq-toggle {
    width: 100%;
    background: #FBCC34;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
}

.faq-toggle:hover {
    background: #FBCC34;
}

.cart-details {
    margin-top: 10px;
    padding: 15px;
    background: white;
    border-radius: 8px;
}

.cart-details table {
    width: 100%;
    border-collapse: collapse;
}

.cart-details th, .cart-details td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.cart-details th {
    text-align: left;
    font-weight: 600;
}


    
`}</style>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Checkout">
                <div>
                    <section className="coupon-area pt-80 pb-30 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s"></section>

                    <section className="checkout-area pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Billing Details */}
                                    <div className="col-lg-6 col-md-12">
                                        <div className="checkbox-form">
                                            <h3>Billing Details</h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Name <span className="required">*</span></label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter your name" 
                                                            value={name} 
                                                            onChange={(e) => setName(e.target.value)} 
                                                            required 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Email <span className="required">*</span></label>
                                                        <input 
                                                            type="email" 
                                                            placeholder="Enter your email" 
                                                            value={email} 
                                                            onChange={(e) => setEmail(e.target.value)} 
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Delivery Address <span className="required">*</span></label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter your delivery address" 
                                                            value={deliveryAddress} 
                                                            onChange={(e) => setDeliveryAddress(e.target.value)} 
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Service Method (Delivery)</label>
                                                        <input type="text" value="$0.00" disabled />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Delivery Date <span className="required">*</span></label>
                                                        <input 
                                                            type="date" 
                                                            value={deliveryDate} 
                                                            onChange={(e) => setDeliveryDate(e.target.value)} 
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Delivery Time <span className="required">*</span></label>
                                                        <select 
                                                            value={deliveryTime} 
                                                            onChange={(e) => setDeliveryTime(e.target.value)} 
                                                            required
                                                        >
                                                            <option value="">Select Delivery Time</option>
                                                            <option value="8am-10am">8 AM - 10 AM</option>
                                                            <option value="10am-12pm">10 AM - 12 PM</option>
                                                            <option value="12pm-2pm">12 PM - 2 PM</option>
                                                            <option value="2pm-4pm">2 PM - 4 PM</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Phone <span className="required">*</span></label>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter Phone No" 
                                                            value={phone} 
                                                            onChange={(e) => setPhone(e.target.value)} 
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="confirm-order-container">
                                                        <button type="submit" className="confirm-order-btn">Confirm Order</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="col-lg-6 col-md-12">
                                        <div className="your-order mb-30">
                                            <h3>Order Summary</h3>
                                            <div className="order-summary">
                                                <div className="summary-item">
                                                    <span>Cart Subtotal:</span>
                                                    <strong> ${total.toFixed(2)}</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Service Type:</span>
                                                    <strong>$0.00</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Shipping:</span>
                                                    <strong>Delivery</strong>
                                                </div>
                                                <div className="summary-item total">
                                                    <span>Order Total:</span>
                                                    <strong> ${total.toFixed(2)}</strong>
                                                </div>
                                            </div>

                                            {/* FAQ Section */}
                                            <div className="cart-faq">
                                                <button
                                                    className="faq-toggle"
                                                    onClick={() => setShowCartDetails(!showCartDetails)}
                                                >
                                                    {showCartDetails ? "Hide Cart Details" : "View Cart Details"}
                                                </button>

                                                {showCartDetails && (
                                                    <div className="cart-details">
                                                        <h4>Cart Details</h4>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th className="product-name">Product</th>
                                                                    <th className="product-total">Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
    {cart.map((item) => {
        // Find the selected option for the current item from selectedOption state
        const selectedItem = selectedOption?.find((option) => option.id === item.id);

        // Use the selected price from the stored option, fallback to defaults
        let selectedPriceType = selectedItem ? selectedItem.selectedPriceType : "casePrice";
        let selectedPrice = selectedItem ? selectedItem.selectedPrice : item.case_price;

        // Ensure the selected price is valid, else fallback to unit price
        let finalPrice = selectedPrice > 0 
            ? calculateFinalPrice(selectedPrice, item.product_percentage) 
            : calculateFinalPrice(item.unit_price, item.product_percentage);

        let itemTotal = (item.qty || 0) * finalPrice;

        return (
            <tr className="cart_item" key={item.id}>
                <td className="product-name">
                    {item.product_name} 
                    <strong className="product-quantity"> × {item.qty}</strong>
                </td>
                <td className="product-total">
                    <span className="amount">${itemTotal.toFixed(2)}</span>
                </td>
            </tr>
        );
    })}
</tbody>


                                                        </table>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}

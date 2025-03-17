import { useState, useEffect } from "react";
import Link from "next/link";

const ShopCard = ({ item, addToCart }) => {
    // Store selected price type (default: Unit Price if available)
    const [selectedPriceType, setSelectedPriceType] = useState("unitprice");
    const [selectedPrice, setSelectedPrice] = useState("");

    useEffect(() => {
        // Set default price based on availability
        if (item.unitprice) {
            setSelectedPriceType("unitprice");
            setSelectedPrice(calculatePrice(item.unitprice, item.product_percentage));
        } else if (item.casePrice) {
            setSelectedPriceType("casePrice");
            setSelectedPrice(calculatePrice(item.casePrice, item.product_percentage));
        }
    }, [item]);

    // Handle dropdown change
    const handlePriceChange = (e) => {
        const selectedType = e.target.value;
        setSelectedPriceType(selectedType);

        if (selectedType === "unitprice") {
            setSelectedPrice(calculatePrice(item.unitprice, item.product_percentage));
        } else {
            setSelectedPrice(calculatePrice(item.casePrice, item.product_percentage));
        }
    };

    // Store selected price in sessionStorage on Add to Cart
    const handleAddToCart = () => {
        if (!selectedPriceType || !selectedPrice) {
            alert("Please select a price type before adding to cart.");
            return;
        }


        // Remove non-numeric characters (like "$")
    const numericPrice = parseFloat(selectedPrice.replace(/[$,]/g, ""));

    if (isNaN(numericPrice)) {
        alert("Invalid price selected.");
        return;
    }
        // console.log(selectedPriceType);
        // console.log(selectedPrice);
    
        const cartItem = {
            id: item.id,
            name: item.name,
            selectedPriceType,
            selectedPrice: numericPrice, // Ensure it's stored as a number
        };

        // console.log(cartItem);
    
        sessionStorage.setItem(`cartItem_${item.id}`, JSON.stringify(cartItem));
        addToCart(item.id); // Call Redux or other cart function
    };
    

    return (
        <>
            <div className="shop-card">
                {/* Product Image */}
                <div className="shop-card__image">
                    <Link href="#">
                        <img 
                            src={`http://localhost:5000/uploads/${item.image}`} 
                            alt={item.product_name} 
                            onError={(e) => e.target.src = "http://localhost:5000/uploads/0.jpg"}
                        />
                    </Link>
                </div>

                {/* Product Details */}
                <div className="shop-card__details">
                    <h3 className="shop-card__title">
                        <Link href="#">{item.name}</Link>
                    </h3>

                    <div className="shop-card__info">
                        <p><strong>Item:</strong> {item.productCode}</p>
                        {item.binCode !== "0" && <p><strong>Bin:</strong> {item.binCode}</p>}
                        <p><strong>UPC:</strong> {item.upcCode}</p>
                    </div>

                    {/* Pricing Dropdown */}
                    <div className="shop-card__pricing">
                        {item.unitprice || item.casePrice ? (
                            <>
                                <label><strong>Select Price:</strong></label>
                                <select value={selectedPriceType} onChange={handlePriceChange}>
                                    {item.unitprice && (
                                        <option value="unitprice">
                                            Unit Price - {calculatePrice(item.unitprice, item.product_percentage)}
                                        </option>
                                    )}
                                    {item.casePrice && (
                                        <option value="casePrice">
                                            Case Price - {calculatePrice(item.casePrice, item.product_percentage)}
                                        </option>
                                    )}
                                </select>
                            </>
                        ) : (
                            <p className="unavailable-text">Temporary Unavailable</p>
                        )}
                    </div>

                    {/* Offer Info */}
                    {item.offerInfo && (item.unitprice || item.casePrice) && (
                        <p className="shop-card__offer"><strong>Offer Info:</strong> {item.offerInfo}</p>
                    )}

                    {/* Action Buttons */}
                    {(item.unitprice || item.casePrice) && (
                        <div className="shop-card__actions">
                            <button 
                                onClick={handleAddToCart} 
                                className="btn add-to-cart"
                            >
                                <i className="fal fa-shopping-basket" /> Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* CSS Styling */}
            <style jsx>{`
                .shop-card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 15px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 15px;
                }

                .shop-card__image img {
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                }

                .shop-card__details {
                    flex: 1;
                }

                .shop-card__title {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 8px;
                }

                .shop-card__info p,
                .shop-card__pricing p {
                    margin: 0px 0;
                    font-size: 14px;
                }

                .shop-card__offer {
                    color: red;
                    font-weight: bold;
                    font-size: 14px;
                    margin-top: 5px;
                }

                .shop-card__actions {
                    margin-top: 10px;
                }

                .btn {
                    display: inline-block;
                    padding: 8px 12px;
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: 0.3s ease;
                    border: none;
                }

                .add-to-cart {
                    background: #FBCC34;
                    color: white;
                    margin-right: 8px;
                }

                .add-to-cart:hover {
                    background: black;
                }

                .unavailable-text {
                    color: red;
                    font-weight: bold;
                    font-size: 14px;
                }

                select {
                    width: 65%;
                    padding: 5px;
                    font-size: 14px;
                    margin-top: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            `}</style>
        </>
    );
};

// Function to calculate final price
const calculatePrice = (price, percentage) => {
    const cleanedPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    const pricePercentage = parseFloat(percentage);

    if (!isNaN(cleanedPrice) && !isNaN(pricePercentage)) {
        return `$${(cleanedPrice + (cleanedPrice * pricePercentage) / 100).toFixed(2)}`;
    }
    return "N/A";
};

export default ShopCard;

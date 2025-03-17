import Link from "next/link";

const ShopCard = ({ item, addToCart, addToWishlist }) => {
    return (
        <>
            <div className="col">
                <div className="tpproduct tpproductitem mb-15 p-relative">
                    <div className="tpproduct__thumb">
                        <div className="tpproduct__thumbitem p-relative">
                            <Link href={`/shop-2`}>
                                <img 
                                    src={`http://localhost:5000/uploads/${item.image}`} 
                                    alt={item.product_name} 
                                />
                                <img 
                                    className="thumbitem-secondary" 
                                    src={`http://localhost:5000/uploads/${item.image}`} 
                                    alt={item.product_name} 
                                />
                            </Link>
                           
                        </div>
                    </div>
                    <div className="tpproduct__content-area">
                        <h3 className="tpproduct__title mb-5">
                            <Link href={`/shop-2`}>{item.product_name}</Link>
                        </h3>
                        <div className="tpproduct__priceinfo p-relative d-flex justify-content-between">
    {/* Case Price (Left) */}
    <div className="tpproduct__ammount">
        <span>
            <strong>Case: </strong>
            {(() => {
                const cleanedPrice = parseFloat(item.case_price.replace(/[^0-9.]/g, ""));
                const percentage = parseFloat(item.product_percentage);

                if (!isNaN(cleanedPrice) && !isNaN(percentage)) {
                    const finalPrice =  (cleanedPrice + (cleanedPrice * percentage) / 100).toFixed(2);
                    return `$${finalPrice}`;
                } else {
                    return "N/A";
                }
            })()}
        </span>
    </div>

    {/* Unit Price (Right) */}
    <div className="tpproduct__ammount text-end">
        <span>
            <strong>Unit: </strong>
            {(() => {
                const cleanedPrice = parseFloat(item.unit_price.replace(/[^0-9.]/g, ""));
                const percentage = parseFloat(item.product_percentage);

                if (!isNaN(cleanedPrice) && !isNaN(percentage)) {
                    const finalPrice = (cleanedPrice + (cleanedPrice * percentage) / 100).toFixed(2);
                    return `$${finalPrice}`;
                } else {
                    return "N/A";
                }
            })()}
        </span>
    </div>
</div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopCard;

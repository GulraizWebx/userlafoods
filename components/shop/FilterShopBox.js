'use client'
import { addCart } from "@/features/shopSlice"
import { Fragment, useState, useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux"
import { FaSearch } from "react-icons/fa"; // Import Search Icon

import ShopCard from "./ShopCard"
import ShopCardList from "./ShopCardList"

const FilterShopBox = () => {
    const dispatch = useDispatch();

    // Redux State
    const { shopList, shopSort } = useSelector((state) => state.filter);
    const { price, category } = shopList || {};
    const { perPage } = shopSort;

    // Local State
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 10; // Products per page
    const [activeIndex, setActiveIndex] = useState(2);

    // Debounce search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            
            try {
                // Base URL and method
                let url = "http://localhost:5000";
                let method = "GET";
                let body = null;
                
                // If searching globally (with search term)
                if (debouncedSearchTerm.trim() !== "") {
                    url = `${url}/products?search=${encodeURIComponent(debouncedSearchTerm)}&page=${page}&limit=${limit}`;
                    // Note: If your server expects POST for search, use this instead:
                    // url = `${url}/products/search`;
                    // method = "POST";
                    // body = JSON.stringify({ term: debouncedSearchTerm, page, limit });
                }
                // If filtering by category
                else if (category && category.length > 0) {
                    url = `${url}/products`;
                    method = "POST";
                    body = JSON.stringify({ category_ids: category, page, limit });
                } 
                // Default: random products
                else {
                    url = `${url}/random-products`;
                }

                console.log("Fetching from:", url);
                console.log("Method:", method);
                console.log("Body:", body);

                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json" },
                    body,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched data:", data);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [category, page, debouncedSearchTerm]); // Fetch when search term, category or page changes

    // Handle Search Input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        // Reset to first page when searching
        setPage(1);
    };

    // Add to Cart
    const addToCart = (id) => {
        const item = products.find((item) => item.id === id);
        dispatch(addCart({ product: item }));
    };

    // Ensure products is an array
    const productArray = Array.isArray(products) ? products : [];

    return (
        <>
        <style>
{`
  .search-container {
    margin-bottom: 20px;
    justify-content: end;
    display:flex;

}

.search-box {
    display: flex;
    align-items: center;
    width: 30%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background: #fff;
}

.search-input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    padding-left: 10px;
}

.search-icon {
    color: #666;
    font-size: 18px;
}

.shop-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    background-color: #FBCC34;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.pagination button:hover {
    background-color: #FBCC34;
}

.pagination button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.pagination span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 0 10px;
}
`}
</style>
            <div className="row mb-50">
                <div className="col-lg-12">
                     {/* Search Bar */}
                     <div className="search-container">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search Products"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            {debouncedSearchTerm && (
                                <button 
                                    onClick={() => setSearchTerm("")} 
                                    className="clear-search-button"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {isLoading ? (
                        <div className="text-center py-4">
                            <p>Loading products...</p>
                        </div>
                    ) : (
                        <div className="tab-content" id="nav-tabContent">
                            {/* Tab 1 - List View */}
                            <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                {productArray.length > 0 ? (
                                    productArray
                                        .slice(perPage.start, perPage.end !== 0 ? perPage.end : 10)
                                        .map((item, i) => (
                                            <Fragment key={i}>
                                                <ShopCardList item={item} addToCart={addToCart} />
                                            </Fragment>
                                        ))
                                ) : (
                                    <p>Loading Products.</p>
                                )}
                            </div>

                            {/* Tab 2 - Grid View */}
                            <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                <div>
                                    {productArray.length > 0 ? (
                                        <div className="row row-cols-xxl-2 row-cols-xl-2 row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-1 tpproduct">
                                            {productArray
                                                .map((item, i) => (
                                                    <Fragment key={i}>
                                                        <ShopCard 
                                                            item={{
                                                                id: item.id,
                                                                name: item.product_name,
                                                                category: item.category,
                                                                brand: item.brand_name,
                                                                unitprice: item.unit_price,
                                                                image: item.image,
                                                                productCode: item.product_code,
                                                                upcCode: item.upc_code,
                                                                binCode: item.bin_code,
                                                                casePrice: item.case_price,
                                                                unitSize: item.unit_size,
                                                                caseSize: item.case_size,
                                                                availability: item.availability,
                                                                offerInfo: item.offer_info,
                                                                saleFlag: item.sale_flag,
                                                                product_percentage: item.product_percentage,
                                                                createdAt: item.created_at
                                                            }} 
                                                            addToCart={addToCart} 
                                                        />
                                                    </Fragment>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <p>Loading Products</p>
                                    )}

                                    {/* Pagination */}
                                    <div className="pagination">
                                        <button 
                                            disabled={page === 1} 
                                            onClick={() => setPage(page - 1)}
                                        >
                                            Previous
                                        </button>
                                        <span> Page {page} </span>
                                        <button onClick={() => setPage(page + 1)}>
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FilterShopBox
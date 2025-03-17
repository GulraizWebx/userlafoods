"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, categoryCheck } from "../../features/productSlice";
import { addCategory } from "../../features/filterSlice";

const CategoryLevel = () => {
    const dispatch = useDispatch();
    const { categoryList, loading, error } = useSelector((state) => state.product);
    const selectedCategories = useSelector((state) => state.filter.category) || [];
    

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categoryHandler = (e, id) => {

        dispatch(addCategory(id));
        dispatch(categoryCheck(id));

    };

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {categoryList.map((item) => (
                <div className="form-check" key={item.id}>
                    <input
                        className="form-check-input"
                        id={`category${item.id}`}
                        type="checkbox"
                        value={item.value}
                        checked={item.isChecked || false}
                        onChange={(e) => categoryHandler(e, item.id)}
                    />
                    <label className="form-check-label" htmlFor={`category${item.id}`}>
                        {item.name}
                    </label>
                </div>
            ))}
        </>
    );
};

export default CategoryLevel;

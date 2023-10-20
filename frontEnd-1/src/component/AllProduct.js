import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList);
    const categoryList = [...new Set(productData.map((el) => el.category))];

    // Filter data display
    const [activeFilter, setActiveFilter] = useState(""); // Store the active filter category

    const handleFilterProduct = (category) => {
        // Check if the clicked category is the active filter
        if (category === activeFilter) {
            // If it is, deselect it
            setActiveFilter("");
        } else {
            // If it's not, select it
            setActiveFilter(category);
        }
    };

    const loadingArrayFeature = new Array(10).fill(null);

    // Function to check if a category is active
    const isCategoryActive = (category) => category === activeFilter;

    // Function to filter products based on the active filter
    const filterProducts = () => {
        if (!activeFilter) {
            return productData;
        } else {
            return productData.filter((el) => el.category.toLowerCase() === activeFilter.toLowerCase());
        }
    };

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

            <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                {categoryList[0] ? (
                    categoryList.map((el) => (
                        <FilterProduct
                            category={el}
                            key={el}
                            isActive={isCategoryActive(el.toLowerCase())}
                            onClick={() => handleFilterProduct(el.toLowerCase())}
                        />
                    ))
                ) : (
                    <div className="min-h-[150px] flex justify-center items-center">
                        <p>Loading...</p>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 my-4">
                {filterProducts()[0]
                    ? filterProducts().map((el) => (
                        <CardFeature
                            key={el._id}
                            id={el._id}
                            image={el.image}
                            name={el.name}
                            category={el.category}
                            price={el.price}
                        />
                    ))
                    : loadingArrayFeature.map((el, index) => (
                        <CardFeature loading="Loading..." key={index + "allProduct"} />
                    ))}
            </div>
        </div>
    );
};

export default AllProduct;

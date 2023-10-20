import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";
import {loginRedux} from "../redux/userSlice";
import {deleteProduct} from "../redux/productSlide";

const Menu = () => {
    const userData = useSelector((state) => state.user);
    const {filterby } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productData = useSelector((state) => state.product.productList);

    // Find the product that matches the filter ID
    const productDisplay = productData.find((el) => el._id === filterby);

    useEffect(() => {
        const dataRes = JSON.parse(localStorage.getItem("dataRes"));
        if (dataRes) {
            dispatch(loginRedux(dataRes));
        }
    }, []);

    const handleAddCartProduct = (e) => {
        if (productDisplay) {
            dispatch(addCartItem(productDisplay));
        }
    };

    const handleDeleteProduct = async () => {
        const productId = productDisplay._id; // Use the actual product's ID

        try {
            // Make a DELETE request to the server to delete the product without the Authorization header
            const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/deleteProduct/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // If the deletion on the server is successful, dispatch the action to remove the product locally
                dispatch(deleteProduct(productId));
                console.log("Product deleted successfully");
            } else {
                console.log("Failed to delete the product");
            }
        } catch (error) {
            console.error("Error deleting the product", error);
        }
    };

    const handleBuy = () => {
        if (productDisplay) {
            dispatch(addCartItem(productDisplay));
            navigate("/cart");
        }
    };

    return (
        <div className=" p-2 md:p-4">
            {productDisplay ? (
                <div className=" drop-in w-full max-w-4xl m-auto md:flex bg-white">
                    <div className="max-w-sm  overflow-hidden w-full p-5">
                        <img
                            src={productDisplay.image}
                            className="hover:scale-105 transition-all h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
                            {productDisplay.name}
                        </h3>
                        <p className="text-slate-500  font-medium text-2xl">{productDisplay.category}</p>
                        <p className="font-bold md:text-2xl">
                            <span className="text-red-500">₹</span>
                            <span>{productDisplay.price}</span>
                        </p>

                        <div className="flex gap-3">
                            <button onClick={handleBuy} className="bg-cyan-300 py-1 mt-2 rounded hover:bg-cyan-400 min-w-[100px]">Buy</button>
                            <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-400 min-w-[100px]">Add to Cart</button>

                            <div>
                                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <button onClick={handleDeleteProduct} className="bg-red-500 py-1 mt-2 rounded hover:bg-red-800 min-w-[100px] hover:shadow-md hover:text-red-500">Delete</button>
                                )}
                            </div>

                        </div>
                        <div>
                            <p className="text-slate-600 font-medium">Description : </p>
                            <p>{productDisplay.description}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className={"drop-in-2"}>
            <AllProduct heading={"Filters:-"} />
            </div>
        </div>
    );
};

export default Menu;

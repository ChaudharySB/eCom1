import React, { useEffect, useRef, useState } from "react";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
import { useNavigate } from "react-router-dom";
import {loginRedux} from "../redux/userSlice";
import { useDispatch,useSelector } from "react-redux";
import Footer from "../component/Footer";



const Home = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();


    useEffect(() => {
        const dataRes = JSON.parse(localStorage.getItem("dataRes"));
        if (dataRes) {
            dispatch(loginRedux(dataRes));
        }
    }, []);

    const productData = useSelector((state) => state.product.productList);
    const homeProductCartList = productData.slice(1, 5);
    const homeProductCartListVegetables = productData.filter(
        (el) => el.category === "vegetable",
        []
    );
    const loadingArray = new Array(4).fill(null);
    const loadingArrayFeature = new Array(10).fill(null);

    const slideProductRef = useRef();
    const nextProduct = () => {
        slideProductRef.current.scrollLeft += 200;
    };
    const preveProduct = () => {
        slideProductRef.current.scrollLeft -= 200;
    };




    return (
        <div className="drop-in-2  bodyWall bg-cover bg-center p-2 md:bg-cover md:bg-center p-4 bg-clip-content">
            <div className="md:flex gap-4 py-4 ">
                <div className="md:w-1/2 space-y-5">
                    <h2 className="text-4xl md:text-7xl font-bold py-3">
                        You Choose!{" "}
                        <span className="text-blue-500 text-">We Deliver.</span>
                    </h2>
                    <p className="py-3 text-3xl text-base text-red-400 ">
                       Deals You Wont Find Anywhere Else,Grab The Deal While We Bring More........
                    </p>
                    <div className={"flex space-x-4"}>
                    <button className="font-bold bg-red-500 text-slate-200 px-4 py-1 rounded-md">
                        Order Now
                    </button>
                    <div className="flex gap-8 bg-slate-300 w-50 px-2 items-center rounded-full bg-teal-400">
                        <p className="text-sm font-medium text-slate-700">Quick Delivery</p>
                        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/delivery--v1.png" alt="delivery--v1"/>
                    </div>
                    </div>
                    <div><Footer /></div>
                </div>

                <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
                    {homeProductCartList[0]
                        ? homeProductCartList.map((el) => {
                            return (
                                <HomeCard
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    price={el.price}
                                    category={el.category}
                                />
                            );
                        })
                        : loadingArray.map((el, index) => {
                            return <HomeCard key={index+"loading"} loading={"Loading..."} />;
                        })}
                </div>
            </div>

        </div>
    );
};

export default Home;
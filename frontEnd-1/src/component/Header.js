import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowMenu = () => {
        setShowMenu((preve) => !preve);
    };
    const handleLogout = () => {
        dispatch(logoutRedux());
        localStorage.clear();
        toast("Logout successfully");
        navigate("/")
    };


    const cartItemNumber = useSelector((state)=>state.product.cartItem)
    return (
        <header className=" opacity-100 header drop-in top-0 fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white shadow-teal-400">
            {/* desktop */}

            <div className="flex items-center h-full justify-between">
                <Link to={""}>
                    <div className="h-10 flex">
                        <img src={logo} className="h-full" />
                        <h6 className={"text-xl sm:text-2xl"}>BackDoor-Sales</h6>
                    </div>
                </Link>

                <div className="flex items-center gap-4 md:gap-7 ">
                    <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                        <Link className="transition-transform hover:scale-105" to={""}>Home</Link>
                        <Link className="transition-transform hover:scale-105" to={"menu"}>Menu</Link>
                        <Link className="transition-transform hover:scale-105" to={"about"}>About</Link>
                        <Link className="transition-transform hover:scale-105" to={"contact"}>Contact</Link>
                    </nav>
                    <div className="text-2xl text-slate-600 relative transition-transform hover:scale-105">
                        <Link to={"cart"}>
                            <BsCartFill />
                            <div className="absolute -top-2 -right-2 text-white bg-cyan-600  h-5 w-4 rounded-full m-0 p-0 text-sm text-center ">
                                {cartItemNumber.length}
                            </div>
                        </Link>
                    </div>
                    <div className=" drop-in-2 text-slate-600" onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md transition-transform hover:scale-105">
                            {userData.image ? (
                                <img src={userData.image} className="h-full w-full" />
                            ) : (
                                <HiOutlineUserCircle />
                            )}
                        </div>
                        {showMenu && (
                            <div className=" text-sm absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <Link
                                        to={"newproduct"}
                                        className="whitespace-nowrap cursor-pointer px-2"
                                    >
                                        New product
                                    </Link>
                                )}

                                {userData.image ? (
                                    <p
                                        className=" text-sm cursor-pointer text-white px-2 bg-red-500"
                                        onClick={handleLogout}
                                    >
                                        Logout ({userData.firstName}){" "}
                                    </p>
                                ) : (
                                    <Link
                                        to={"login"}
                                        className="whitespace-nowrap cursor-pointer px-2"
                                    >
                                        login
                                    </Link>
                                )}
                                <nav className="text-base md:text-lg flex flex-col md:hidden">
                                    <Link to={""} className="px-2 py-1">
                                        Home
                                    </Link>
                                    <Link
                                        to={"menu/63f0fdbb3bcc2f97fa53d25d"}
                                        className="px-2 py-1"
                                    >
                                        Menu
                                    </Link>
                                    <Link to={"about"} className="px-2 py-1">
                                        About
                                    </Link>
                                    <Link to={"contact"} className="px-2 py-1">
                                        Contact
                                    </Link>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
        </header>
    );
};

export default Header;
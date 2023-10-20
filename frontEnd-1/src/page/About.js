import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginRedux} from "../redux/userSlice";
import {toast} from "react-hot-toast";

const About = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const dataRes = JSON.parse(localStorage.getItem("dataRes"));
    if (dataRes) {
      dispatch(loginRedux(dataRes));
    }
  }, []);

  return (
    <div className={""}>
      <div className={"flex flex-col items-center p-7 space-y-16 overflow-hidden"}>
        <h1 className={" header drop-in drop-shadow-lg data-te font-serif font-bold text-3xl sm:text-7xl "}>Website <span className="text-blue-900">Features !</span> </h1>
        <ul className={" drop-in-2 text-amber-700  text-2xl items-center flex flex-col items-center space-y-3"}>
          <li className={"drop-shadow-lg"}>Login,Register User</li>
          <li className={"drop-shadow-lg"}>Product Listing</li>
          <li className={"drop-shadow-lg"}>Responsive Pages To Screen Size</li>
          <li className={"drop-shadow-lg"}>Admin Login For Product Management(Delete,Add Product)</li>
          <li className={"drop-shadow-lg"}>Routing</li>
          <li className={"drop-shadow-lg"}>Full featured shopping cart</li>
          <li className={"drop-shadow-lg"}> Payment Gateway</li>
          <li className={"drop-shadow-lg"}> Custom Image's support</li>
          <li className={"drop-shadow-lg"}> Password Encryption</li>
          <li className={"drop-shadow-lg"}> JWT Token Authentication</li>
        </ul>

        <h1 className={"header drop-in drop-shadow-lg font-serif text-2xl sm:text-5xl"}>-Technology Used-</h1>
        <ul className=" drop-in-2 flex flex-col sm:flex-row sm:space-x-12 space-y-3 text-2xl ">
          <li><img className="w-16 h-16 animate-spin-slow" src="https://img.icons8.com/color/48/react-native.png" alt="react-native" /> ReactJS</li>
          <li><img className="w-16 h-16 animate-bounce" src="https://img.icons8.com/color/48/html-5--v1.png" alt="html-5--v1" />HTML5</li>
          <li><img className="w-16 h-16 animate-pulse" src="https://img.icons8.com/color/48/tailwindcss.png" alt="tailwindcss" />Tailwind</li>
          <li><img className="w-16 h-16 animate-bounce" src="https://img.icons8.com/fluency/48/javascript.png" alt="javascript" />JavaScript</li>
          <li><img className="w-16 h-16 animate-ping-slow" src="https://img.icons8.com/color/48/nodejs.png" alt="nodejs" />NodeJS</li>
          <li><img className="w-16 h-16 animate-bounce" src="https://img.icons8.com/ios/50/express-js.png" alt="express-js" />ExpressJS</li>
          <li><img className="w-16 h-16 animate-spin-slow" src="https://img.icons8.com/color/48/redux.png" alt="redux" />Redux</li>
          <li><img className="w-16 h-16 animate-bounce" src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-mongodb-a-cross-platform-document-oriented-database-program-logo-filled-tal-revivo.png" alt="external-mongodb-a-cross-platform-document-oriented-database-program-logo-filled-tal-revivo"/>MongoDB</li>
          <li><img className="w-16 h-16 animate-bounce" src="https://img.icons8.com/ios-filled/50/css.png" alt="redux" />CSS</li>
        </ul>


      </div>
    </div>
  )
}

export default About
import React, {useEffect} from 'react'
import {loginRedux} from "../redux/userSlice";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import adminimg from "../assest/adminphoto.jpg";


const Contact = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const dataRes = JSON.parse(localStorage.getItem("dataRes"));
    if (dataRes) {
      dispatch(loginRedux(dataRes));
    }

  }, []);
  return (

      <div className="flex flex-col sm:flex-row md:flex-row h-screen relative">
          {/* Left Section (Small and Medium screens) */}
          <div className="flex-1 flex justify-center items-center flex-col space-y-4 pr-4">
              <h1 className=" drop-in text-3xl  sm:text-5xl md:text-5xl font-italic">WE'RE NOT DONE YET,</h1>
              <h1 className="text-4xl drop-in-2 sm:text-8xl md:text-8xl text-amber-400 border-b-2 border-b-black font-bold">LET'S TALK!</h1>

              {/* LinkedIn Icon (Small and Medium screens) */}
              <a href="https://www.linkedin.com/in/shubhamchaudhary000012345/" target="_blank">
                  <img className="box drop-in " width="70" height="70" src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" />
              </a>

              {/* Phone Icon and Number (Small and Medium screens) */}
              <div className="flex flex-row space-x-4 justify-center">
                  <img className={"drop-in-2"} width="70" height="70" src="https://img.icons8.com/ios-filled/50/phone.png" alt="Phone" />
                  <h1 className="text-2xl drop-in  sm:text-3xl md:text-3xl">-9410651974</h1>
              </div>
          </div>

          {/* Vertical Line Separator (50% Height) (Hidden on Mobile screens) */}
          <div className=" hidden sm:flex md:flex border border-gray-800 absolute h-[50%] top-1/2 transform -translate-y-1/2 left-1/2"></div>

          {/* Right Section (Small and Medium screens) */}
          <div className="flex-1 flex justify-center items-center flex-col space-y-4">
              <img className="adminPhoto drop-in " src={adminimg} />
              <h1 className=" drop-in-2 text-2xl sm:text-5xl md:text-5xl border-b-2 border-b-black font-serif">Shubham Chaudhary</h1>
          </div>
      </div>


  )
}

export default Contact
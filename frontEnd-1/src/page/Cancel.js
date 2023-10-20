import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginRedux} from "../redux/userSlice";

const Cancel = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();

    useEffect(() => {
        const dataRes = JSON.parse(localStorage.getItem("dataRes"));
        if (dataRes) {
            dispatch(loginRedux(dataRes));
        }

    }, []);

    return (
    <div className='bg-red-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg'>
        <p>Payment is Cancel</p>
    </div>
  )
}

export default Cancel
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/emptyCart.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import {loginRedux} from "../redux/userSlice";

const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem);
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    useEffect(() => {
        const dataRes = JSON.parse(localStorage.getItem("dataRes"));
        if (dataRes) {
            dispatch(loginRedux(dataRes));
        }

    }, []);


  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );



  const handlePayment = async()=>{

      if(user.email){

          const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
          const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`,{
            method : "POST",
            headers  : {
               // 'Authorization': `bear ${JSON.parse(localStorage.getItem("token"))}`,
              "content-type" : "application/json"
            },
            body  : JSON.stringify(productCartItem)
          })
          if(res.statusCode === 500) return;

          const data = await res.json()
          console.log(data)

          toast("Redirect to payment Gateway...!")
          stripePromise.redirectToCheckout({sessionId : data})
      }
      else{
        toast("You have not Login!")
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }

  }
  return (
      <div className="p-2 md:p-4">
          <h2 className="text-lg md:text-2xl font-bold text-slate-600">Your Cart Items:-</h2>

          {productCartItem[0] ? (
              <div className="my-4 flex flex-col md:flex-row gap-3">
                  {/* display cart items  */}
                  <div className="w-full max-w-3xl md:w-1/2">
                      {productCartItem.map((el) => (
                          <CartProduct
                              key={el._id}
                              id={el._id}
                              name={el.name}
                              image={el.image}
                              category={el.category}
                              qty={el.qty}
                              total={el.total}
                              price={el.price}
                          />
                      ))}
                  </div>

                  {/* total cart item  */}
                  <div className="w-full max-w-md md:w-1/2 ml-auto">
                      <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
                      <div className="flex w-full py-2 text-lg border-b">
                          <p>Total Qty:</p>
                          <p className="ml-auto w-32 font-bold">{totalQty}</p>
                      </div>
                      <div className="flex w-full py-2 text-lg border-b">
                          <p>Total Price</p>
                          <p className="ml-auto w-32 font-bold">
                              <span className="text-red-500">₹</span> {totalPrice}
                          </p>
                      </div>
                      <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
                          Payment
                      </button>
                  </div>
              </div>
          ) : (
              <div className="flex flex-col items-center">
                  <img src={emptyCartImage} className="w-50 max-w-sm" alt="Empty Cart" />
                  <p className="text-red-400 text-3xl font-bold">Your cart is EMPTY!!</p>
              </div>
          )}
      </div>

  );
};

export default Cart;

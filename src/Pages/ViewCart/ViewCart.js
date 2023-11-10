import React, { useEffect, useState } from "react";
import "./ViewCart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { items } from "../../Data/Data";
import { cartActions } from "../../Store/Cart-slice";
import { useNavigate } from "react-router";
import ErrorCard from "../../Components/ErrorCard/ErrorCard";
const ViewCart = () => {
  const [erroLogic,setErrorLogic] = useState(false);
  const loggedUser = {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("userToken"),
  };
  let cartItems = useSelector((state) => state.cart);
  useEffect(() => {
    if (loggedUser.token) {
      // console.log(
      //   "logged user cart details",
      //   localStorage.getItem("cartItems")
      // );

      if (localStorage.getItem("cartItems")) {
        localStorage.removeItem("cartItems");
        localStorage.setItem("cartItems",  JSON.stringify(cartItems));
        
      }

      
      localStorage.setItem("cartItems",  JSON.stringify(cartItems));
    
    }
  }, [cartItems]);

  const navigatoin = useNavigate();

  const dispatch = useDispatch();
  const increaseHandler = (value) => {
    dispatch(
      cartActions.addToCart({
        item: value.item,
        price: value.price,
        qty: value.qty,
        id: value.id,
        ORDQTY: value.ORDQTY,
      })
    );
  };
  const decreaseHandler = (value) => {
    dispatch(
      cartActions.removeFromCart({
        id: value.id,
        price: value.price,
        ORDQTY: value.ORDQTY,
      })
    );
  };

  const deleteButtonHandler = (value) => {
    dispatch(
      cartActions.dropFromCart({
        id: value.id,
        price: value.price,
        ORDQTY: value.ORDQTY,
      })
    );
    // console.log("dispatching value", value);
  };
  const placeOrderHandler = () => {
    if (!loggedUser.token) {
      // eror that should be tell to log into site
      setErrorLogic(true);
     
    }

    console.log("this is the orderd item list",cartItems)
    // parse endpoint to username and carItems 
    // then display succesfull message
    // then redirrect to the home

   
   
  };

  const diplayCardHandler = (value)  =>{
    // console.log(value)
    if(value.btn1){
      navigatoin("/login");
    }
    if(value.btn2){
      navigatoin("/signUp");
    }
  }
  return (
    <div className="viewCart_main">
      <Navbar />
    

      <div className="viewCart_body">
      
        <div className="VC_body_left">
          {" "}
          {cartItems.cartItems.map((cartItem) => {
            return items.map((item) => {
              if (item.id === cartItem.id) {
                return (
                  <div className="VC_item" key={item.id}>
                    <section className="Item_sec-1">
                      <section className="IT_Sec-1_left">
                        <img src={item.imageUrl} alt="item" />
                      </section>
                      <section className="IT_Sec-1_right">
                        <h4>{item.title}</h4>
                        <h5>{item.brand} </h5>
                        <h5> {item.quantity} item(s) in stock</h5>
                      </section>
                    </section>
                    <section className="Item_sec-2">
                      <section className="IT_Sec-2_left">
                        <h3>RS. {item.price} </h3>
                        <button
                          onClick={() => {
                            deleteButtonHandler({
                              id: item.id,
                              price: item.price,
                              ORDQTY: cartItem.ORDQTY,
                            });
                          }}
                        >
                          {" "}
                          <MdDelete id="dlete_svg" />{" "}
                        </button>
                      </section>
                      <section className="IT_Sec-2-right">
                        <button
                          onClick={() => {
                            decreaseHandler({
                              id: item.id,
                              price: item.price,
                              ORDQTY: cartItem.ORDQTY,
                            });
                          }}
                        >
                          -
                        </button>
                        <span> {cartItem.ORDQTY}</span>
                        <button
                          onClick={() => {
                            increaseHandler({
                              item: item.description,
                              price: item.price,
                              qty: item.quantity,
                              id: item.id,
                              ORDQTY: cartItem.ORDQTY,
                            });
                          }}
                        >
                          +
                        </button>
                      </section>
                    </section>
                  </div>
                );
              }
            });
          })}
        </div>
        <div className="VC_body_right">
          <h3>Order Summery</h3>
          <section>
            <span>Subtotal ( {cartItems.totalItems} items) </span>
            <span>RS. {cartItems.totalPrice}</span>
          </section>
          <section>
            <span>Total </span>
            <span id="Total_price">RS. {cartItems.totalPrice}</span>
          </section>
          <button
            onClick={() => {
              placeOrderHandler();
            }}
          >
            Place The Order
          </button>
        </div>
      </div>
      {erroLogic && (<ErrorCard   details = {{message:"You Have To SignIn/SignUp Before Place an Order", btn1:[true,"SignIn"], btn2:[true,"SignUp"]}} fn = {diplayCardHandler}/>)}
    </div>
  );
};

export default ViewCart;

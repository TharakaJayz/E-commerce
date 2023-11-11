import React from 'react'
import './ItemCard.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../Store/Cart-slice';
const ItemCard = (props) => {
  const dispatch = useDispatch();

  const buttonHandler  = ()  =>{
    // dispatch(cartActions.addToCart({item:props.title,price:props.price,qty:props.qty,id:props.id,ORDQTY:1,brand:props.brand}));
    dispatch(cartActions.addToCart({item:props.title,price:props.price,qty:props.qty,id:props.id.trim(),ORDQTY:1,brand:props.brand}));
  }
  
  return (
    <div className='item_main'>
      <img src = {props.imageUrl} alt='head phone' id = "item_img" />
      <span>{props.description}</span>
      <h3>Price: RS {props.price}</h3>
      <h4> quantity: {props.qty}</h4>
      <button onClick={buttonHandler}>add to cart</button>
    </div>
  )
}

export default ItemCard
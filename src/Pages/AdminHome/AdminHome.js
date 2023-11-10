import React, { useState } from 'react';
import "./AdminHome.css";
import Navbar from '../../Components/Navbar/Navbar';
import { checkEmpty } from '../../Validations/Validations';

const AdminHome = () => {
    
    const [titleInput,setTitleInput] = useState("");
    const [descInput,setDescInput] = useState("");
    const [priceInput,setPriceInput] = useState("");
    const [qtyInput,setQtyInput] = useState("");
    const [brandInput,setBrandInput] = useState("");
    const [imageInput,setImageInput] = useState("");
    const [categoryInput,setCategoryInput] = useState("");

    const [error,setError] = useState({logic:false,msg:""});

    const formHandler = (e)  =>{
        e.preventDefault();
        console.log("all inputs",titleInput,descInput,priceInput,qtyInput,brandInput,imageInput,categoryInput);

        if(( checkEmpty(titleInput) || checkEmpty(descInput)  || checkEmpty(priceInput) || checkEmpty(qtyInput) || checkEmpty(brandInput) || checkEmpty(imageInput) || checkEmpty(categoryInput))){
            setError({
                logic:true,
                msg:"All Fields Should Be Filled"
            });
            console.log("hiii")
            return;

        }

        setError({logic:false,msg:""});
        
        setTitleInput("");
        setDescInput("");
        setPriceInput("");
        setQtyInput("");
        setBrandInput("");
        setImageInput("");
        setCategoryInput("");
       
        
    }

    const cancelButtonHandler = ()  =>{
            
            setTitleInput("");
            setDescInput("");
            setPriceInput("");
            setQtyInput("");
            setBrandInput("");
            setImageInput("");
            setCategoryInput("");
    }
  return (
    <div className='AH_main'> 
      <Navbar  />
      <div className='AH_body'>
       <form className='AH_form' onSubmit={formHandler}>
        <h2>Add New Product</h2>
        <div id='image_container'> <img src={imageInput} alt='item' /></div>
           
        <section>
            <span>Title</span>
            <input type='text' name='title' value={titleInput} onChange={(e) =>{setTitleInput(e.target.value)}}/>
        </section>
        <section>
            <span>Description</span>
            <input type='text' name='description' value={descInput} onChange={(e) =>{setDescInput(e.target.value)}}/>
        </section>
        <section>
            <span>Price</span>
            <input type='text' name='Price' value={priceInput} onChange={(e) =>{setPriceInput(e.target.value)}}/>
        </section>
        <section>
            <span>quantity</span>
            <input type='text' name='quantity' value={qtyInput} onChange={(e) =>{setQtyInput(e.target.value)}}/>
        </section>
        <section>
            <span>brand</span>
            <input type='text' name='brand' value={brandInput} onChange={(e) =>{setBrandInput(e.target.value)}}/>
        </section>
        <section>
            <span>category</span>
            <input type='text' name='category' value={categoryInput} onChange={(e) =>{setCategoryInput(e.target.value)}}/>
        </section>
        <section>
            <span>imageUrl</span>
            <input type='text' name='imageUrl' value={imageInput} onChange={(e) =>{setImageInput(e.target.value)}}/>
        </section>

        {error.logic && (<p>{error.msg}</p>)}
        
        <div>
        
        <button type='submit' >Add Item</button>
        <button onClick={()=>{cancelButtonHandler()}}>Cancel</button>
        </div>
       
       </form>
       
      </div>
    </div>
  )
}

export default AdminHome

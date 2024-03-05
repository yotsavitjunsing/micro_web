import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt'
import './cal.css'
import { useNavigate} from 'react-router-dom'


const Calculate = () => {

  const routepage =useNavigate();
  const [repay,setrepay] =useState(0);
  localStorage.setItem('repay', repay);
  const [datatype_of_product, setdatatype_of_product] = useState(0);
  const [sell, setsell] = useState(0);
  const [calculate,setcalculate]=useState(0);
  const resetdata = async ()=> {
    
    
    try{ 
      let resphone = await fetch(`http://localhost:3333/setdata`,{
        method:'GET',
        mode:'cors',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await resphone.json();
    console.log(data.status);
    if(data.status === 'success'){
      window.location.reload();
      
     }else {
        console.log('error')
        
    }}
    catch(error){
        console.error('Error:', error);
       
    }
}
  
  useEffect(() => {
    
  const usedata = async ()=> {
    
    
    try{ 
      let resphone = await fetch(`http://localhost:3333/showdata`,{
        method:'GET',
        mode:'cors',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await resphone.json();
    console.log(data.status);
    if(data.status === 'success'){
      setdatatype_of_product(data);
      console.log(datatype_of_product);
     }else {
        console.log('error')
        
    }}
    catch(error){
        console.error('Error:', error);
       
    }
}

 
usedata();
  }, []);
  
 return (
  <div className='cal-page'>
    <div>ชื่อสินค้า : {datatype_of_product.name}</div>
    <div>ชิ้นละ : {datatype_of_product.cost} บาท</div>
    <div>ราคารวม : {datatype_of_product.calculate} บาท</div>
      
      
    <input type="text" placeholder="ใส่จำนวนเงิน" onChange={(e)=>{setsell(e.target.value);console.log("sell="+sell);console.log("data="+datatype_of_product.calculate)}}/>
    
    <div className='button-container'>
      <button className="cal-button" onClick={()=>{window.location.reload()}}>ตรวจสอบการสแกน</button>
      <button className="cal-button" onClick ={()=>{setrepay(sell-datatype_of_product.calculate);setcalculate(1);}}>คิดเงิน</button>
      <button className="cal-button" onClick={()=>{resetdata()}}>คิดรายการถัดไป</button>
    </div>

    {!calculate?<div></div>:<div>เงินทอน : {repay} บาท</div>}

    <button onClick={() => routepage('/')}>คลิกเพื่อดูสถิติการขาย</button>
  </div>
 );
};
export default Calculate;
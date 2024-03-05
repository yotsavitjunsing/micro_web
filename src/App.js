import React, { useState, useEffect, routepage } from 'react';
import { PieChart, Pie, Tooltip, Cell, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import './App.css'
import { useNavigate} from 'react-router-dom'

function App() {
  const routepage =useNavigate();
  const [productData, setProductData] = useState([]);
  const [type_of_product, settype_of_product] = useState(1);
  const [datatype_of_product, setdatatype_of_product] = useState([]);
  const fecthDatatype = async ()=> {
    let id=type_of_product;
    console.log(id);
    try{ let resphone = await fetch(`http://localhost:3333/type_product/${id}`,{
        method:'GET',
        mode:'cors',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await resphone.json();
    if(data.status === 'success'){
      setdatatype_of_product(data.data)
     
     
    }else {
        console.log('error')
    }}
    catch(error){
        console.error('Error:', error);
       
    }
}
 
  useEffect(() => {
    const fecthData = async ()=> {
      try{ let resphone = await fetch(`http://localhost:3333/product`,{
          method:'GET',
          mode:'cors',
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      });
      const data = await resphone.json();
      if(data.status === 'success'){
        setProductData(data.data)
       
      }else {
          console.log('error')
      }}
      catch(error){
          console.error('Error:', error);
          alert('Error fetching address data.');
      }
  }
  
 
  fecthDatatype();
  fecthData();
  }, []);
  console.log(datatype_of_product);
  console.log(productData);
  // Transform fetched data into the format required by charts
  const chartData = productData.map(product => ({
    name: product.name_p,
    value: parseInt(product.remaining)*parseInt(product.cost) // Assuming cost is the sales price and remaining is the quantity sold
   
  }));
 
 
  // Colors for the Pie chart
  const colors = chartData.map((entry, index) => `rgb(2${index}${index} ${index}${index}${index}  ${index})`);
 
  return (
    <div style={{ textAlign: "center" }}>
      <h1>รายละเอียดการขายสินค้า</h1>
      <button onClick={() => routepage('/cal')}>คลิกเพื่อไปหน้าคำนวณราคาสินค้า</button>
      <div className="App" style={{display: 'flex',alignItems: 'center',justifyContent: 'space-around',padding: '3rem 0rem'}}>
        <div className='radius-graph'>
          <PieChart width={400} height={400}>
          <Pie
            dataKey="amount"
            isAnimationActive={false}
            data={productData}
            cx={200}
            cy={200}
            outerRadius={150}
            label
            
          >
          {productData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} onClick={()=>{{settype_of_product(index+1);fecthDatatype()}}}/>
          ))}
        
          </Pie>
          <Tooltip
            cursor={{ stroke: '#000', strokeWidth: 2 }}
            formatter={(value, name, props) => [props.payload.amount,props.payload.name_type]} // ให้แสดง name_p เป็น name และ cost เป็น value
          />
          </PieChart>
          <h3>คลิกสองครั้งที่ส่วนแผนภูมิวงกลมเพื่อดูรายละเอียด</h3>
        </div>
        
 
 
        <BarChart
          width={700}
          height={500}
          data={datatype_of_product[0]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name_p" scale="point" padding={{ left: 10, right: 10 }  } />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="piece" fill= {colors[type_of_product-1]} background={{ fill: '#eee' }} />
        </BarChart>
      </div>
    </div>
  );
}
 
export default App;
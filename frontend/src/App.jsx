import { useState,useEffect } from "react";
import axios from "axios"


function App() {
const[message,setMessage]=useState("");
useEffect(()=>{
axios.get("http://localhost:5000/")
.then((res)=>setMessage(res.data))
.catch((err)=>console.log(err))
},[])
  return (
    <>
  <p>{message}</p>
      <h1>Youtube Clone</h1>
    </>
  )
}

export default App

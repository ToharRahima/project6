import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react"
export default function FileContent(){
    const[content,setContent]=useState("");
    const{username,file}=useParams();
    useEffect(()=>{
    fetch(`http://localhost:3000/users/${username}/${file}`).then((res)=>{if(!res.ok) throw new Error("couldnt get the file content")
    return res.json()
    }).then((data)=> {console.log(data); setContent(data)})},[])
return(<>
<h1>{file}</h1>
<div>{content}</div>
</>)
}
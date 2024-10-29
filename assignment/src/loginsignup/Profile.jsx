import { useEffect, useState } from "react"
import axios from 'axios';

const Profile =()=>{
    const [user,setuser]=useState({name:"",email:""});
    const [isediting,setisediting]=useState(false);
    const [formdata,setformdata]=useState({...user});

    const handlechange=()=>{
        const {name,value}=e.target;
        setformdata({...formdata,[name]:value});
    }

    const handleedit=()=>{
        isediting(true)
    }

    useEffect(()=>{
        const fetchdata=async()=>{
            try{
        const res=await axios.get('// get user profile url');
        setuser(res.data);
        setformdata(res.data);
            }catch(error){
            console.log(error);
        }
        }

        fetchdata();
    },[])

    const handlesaving=async()=>{
        try{
        const res=axios.post('//post user profile url',formdata);
        setuser(res.data);
        setisediting(false);
        }catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <h1>user profile</h1>
        <p>name: {isediting?(
            <input type="text" value={formdata.name} onChange={handlechange}/>

        ):(
            user.name
        )}</p>

<p>email: {isediting?(
            <input type="email" value={formdata.email} onChange={handlechange}/>

        ):(
            user.email
        )}</p>
    
    <button onClick={isediting?handlesaving:handleedit}>{isediting?'change profile':'update profile'}</button>
        </>
    )

}
export default Profile;

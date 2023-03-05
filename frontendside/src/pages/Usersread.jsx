import React, { useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./../context/auth";
import "./../styles/AuthStyles.css";
const Usersread = () => {
const { id } = useParams();
const [auth, setAuth] = useAuth();
const [user, setUser]= useState({
name:"",
email:"",
age:""
});

console.log(user.email);
  const navigate = useNavigate();

const handleChange = (e) => {  
e.persist();  
setUser({...user, [e.target.name]: e.target.value});  
}
const GetData = async () => {  
const result = await axios.get(`http://localhost:4000/api/users/${id}`,
       {
        headers: {
        'authorization': `Bearer ${auth?.token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }
      }
  ); 
setUser(result.data.Data);  
};

useEffect(() => {    
GetData();  
}, []); 


  return (
    <Layout title="Users Read - vikas App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form >
          <h4 className="title">View Data</h4>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="age"
              value={user.age}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Age"
              required
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Usersread;

import React, { useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./../context/auth";
import "./../styles/AuthStyles.css";
const Usersupdate = () => {
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
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/api/users/${id}`,
       {
        name:user.name,
        email:user.email,
        age:user.age,
      },
         {
        headers: {
        'authorization': `Bearer ${auth?.token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }
      }
      );
      console.log(res);
      if (res.data.status==true) {
        toast.success( res.data.message);
        navigate("/userslist");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      if(err.response.data.status==false){
      toast.error(err.response.data.message);
    }else{
      toast.error(err.response.data);
    }
    }
  };

  return (
    <Layout title="Register - vikas App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Update Data</h4>
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
          <button type="submit" className="btn btn-primary">
           UPDATE
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Usersupdate;

import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./../context/auth";
import "./../styles/AuthStyles.css";
const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(`${auth?.user?.name}`);
  const [email, setEmail] = useState(`${auth?.user?.email}`);
  const [age, setAge] = useState(`${auth?.user?.age}`);
  const navigate = useNavigate();
  console.log(auth);
  console.log(`${auth?.token}`);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/api/users/${auth?.user?._id}`,
       {
        name:name,
        email:email,
        age:age,
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
        // navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      if(err.response.data.status==false){
      toast.error(err.response.data.message);
    }else{
      toast.error(err.response.data);
    }
    }
  };

  return (
    <Layout title="Profile - vikas App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Profile Data</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Age"
              required
            />
          </div>
         {/* <button type="submit" className="btn btn-primary">
           UPDATE
          </button>*/}
        </form>
      </div>
    </Layout>
  );
};

export default Profile;

import React,{useEffect, useState} from 'react';
import axios from 'axios';
import{Link,useNavigate} from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "./../context/auth";
import DeleteConfirmation from "./../components/DeleteConfirmation";

const Userslist = ()=>{
const [auth, setAuth] = useAuth();
const [user, setUser] = useState([]);
console.log(user);
 const navigate = useNavigate();
  const LoadEdit = (id) => {
        navigate("/usersupdate/" + id);
  }
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
   // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(`Are you sure you want to delete ?`);
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
 };

// Handle the actual deletion of the item
  const LoadDelete = (id) => {
        axios.delete(`http://localhost:4000/api/users/${id}`,
           {
        headers: {
        'authorization': `Bearer ${auth?.token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }
      }
          )
          .then((response) =>{ setUser(response.data);
            navigate('/');
		     // window.location.reload();
		  }).catch((err)=>{console.log("Please Check the Error : ", err)});
  }

  const fetchData = () => {
    axios.get("http://localhost:4000/api/allusers",
      {
        headers: {
        'authorization': `Bearer ${auth?.token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }
      }
      ).then((response) =>{setUser(response.data);
		  }).catch((err)=>{console.log("Please Check the Error : ", err)});
  }

  useEffect(() => {
    fetchData();
  },[])
  
return(
<Layout title="Userslist - vikas App">
<div className="container-fluid mt-5" style={{ minHeight: "100vh" }}>
<div className="userHeading">
<h2 className="text-center">Users List</h2>
</div>
<div className="userTable">
<table>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Date</th>
<th>Action</th>
</tr>
{user.data && user.data.length > 0 && user.data.map((userObj, index) =>{return(
<tr key={index}>
<td>{index+1}</td>
<td>{userObj.name}</td>
<td>{userObj.email}</td>
<td>{userObj.age}</td>
<td>{userObj.date}</td>
<td><a onClick={() => { LoadEdit(userObj._id) }} className="btn btn-success">Edit</a></td>
<td><Link  to={"/usersread/"+userObj._id} className="btn btn-success">Read</Link></td>
<td><Link onClick={() => showDeleteModal(userObj._id)} className="btn btn-success">Delete</Link></td>
</tr>
)})}
</table>
</div>
</div>
<DeleteConfirmation showModal={displayConfirmationModal} confirmModal={LoadDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage}  />
</Layout>
)
}


export default Userslist;

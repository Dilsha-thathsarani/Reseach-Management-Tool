import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState,useEffect,useContext} from "react";
import axios from 'axios';




export default function AllUsers() {
    
    const[request,setRequest] = useState([]); 
    useEffect(()=>{
              
        axios.get("https://research-management-tool-ym.herokuapp.com/user/allprof").then((res)=>{
                setRequest(res.data.existingUser);
            }).catch((err)=>{
                alert(err.message);
             })          

    },[])


    onDelete= (id)=>{
   
      let ans = window.confirm("Are you sure want to delete user account?");
      if(ans){  
      axios.delete(`https://research-management-tool-ym.herokuapp.com/user/delete/${id}`).then((res)=>{
          alert("Profile Successfully Deleted");
          window.location.reload(false);
          }).catch((err)=>{
          alert(err.message);
         })
      }    
  
  }

        
//search bar functions
const filterData = (users,searchkey) =>{

    const result= users.filter((Users) =>
    Users.email.toLowerCase().includes(searchkey) ||
    Users.email.includes(searchkey)||
    Users.reg_number.toLowerCase().includes(searchkey) ||
    Users.reg_number.includes(searchkey)
    )
  
    setRequest(result)
  }
  
  
   function handleSearch(e) {
         
   const searchkey = e.currentTarget.value;
  
   axios.get("https://research-management-tool-ym.herokuapp.com/user/allprof").then((res)=>{
  
           if(res.data.success){
               
             filterData(res.data.existingUser,searchkey)
  
           }
   
   });
  
  }
  
  
      return (
          <div>
              
              <h1 style={{color:"#322B5F"}}><b> <center> All User Profiles </center> </b> </h1>
              
        <br/>
  
         {/* search bar */}
         <div className="container" >
                  <div className="row">
                 
                     <h4> Search Here </h4>
                    <div className="col-lg-3 mt-2 mb-2">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search email or registration number"
                        name="searchQuery"
                        onChange={handleSearch}
                      >
                          
                        </input>
                      
                  </div>

                </div>

            </div>
            <br/>
            <div className = "container">
            
           <table className="table" style={{backgroundColor:"white"}}>

                <thead>
                        <tr>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Number</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Name</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Email</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">User Role &nbsp;</th> 
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Registration Number</th>
                       
                        </tr>

                </thead>
            <tbody>

              {request.map((data,index)=>(
                        
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td> <b> {data.name} </b></td> 
                            <td><b> {data.email} </b> </td> 
                             <td> <b>{data.user_role} </b></td>
                             <td> <b>{data.reg_number} </b></td>  
                           
                            <td>
                            <a className="btn btn-warning" 
                            href={`http://localhost:1234/updateadmin/${data._id}`}
                           
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Update Profile
                            </a>
                            </td>

                            <td>
                            <a className="btn btn-danger" 
                            onClick={()=> onDelete(data._id)}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Delete Profile
                            </a>       
                            </td>

                        </tr>
                        

                ))}
                
                
                </tbody> 
            </table>
      
          </div>

            
        </div>
    )
}

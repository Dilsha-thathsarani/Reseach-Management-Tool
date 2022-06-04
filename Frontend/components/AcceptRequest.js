import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState,useEffect} from "react";
import axios from 'axios';




export default function AcceptRequest() {
    
    const[request,setRequest] = useState([]); 
    useEffect(()=>{
              
        axios.get("http://localhost:8070/pendinguser/pendingall").then((res)=>{
                setRequest(res.data.existingpUser);
            }).catch((err)=>{
                alert(err.message);
             })          

    },[])


    onDelete= (id)=>{
   
      let ans = window.confirm("Are you sure want to reject and delete this request?");
      if(ans){  
      axios.delete(`http://localhost:8070/pendinguser/pendingdelete/${id}`).then((res)=>{
          alert("Request Rejected");
          window.location.reload(false);
          }).catch((err)=>{
          alert(err.message);
         })
      }    
  
  }

  const acceptUser = (data) => {
    let { _id,name,email,password,cf_password,mobile,user_role,research_area,reg_number} = data;

    try {
      const register = axios.post('http://localhost:8070/user/accept',{...data})
      alert("Request Accepted And Profile Activated");
      axios.delete(`http://localhost:8070/pendinguser/pendingdelete/${data._id}`)
      window.location.reload(false);
    } catch (err) {
      err.response.data.msg
    }

}

        
//search bar functions
const filterData = (users,searchkey) =>{

    const result= users.filter((pendingUsers) =>
    pendingUsers.email.toLowerCase().includes(searchkey) ||
    pendingUsers.email.includes(searchkey)||
    pendingUsers.reg_number.toLowerCase().includes(searchkey) ||
    pendingUsers.reg_number.includes(searchkey)
    )
  
    setRequest(result)
  }
  
  
   function handleSearch(e) {
         
   const searchkey = e.currentTarget.value;
  
   axios.get("http://localhost:8070/pendinguser/pendingall").then((res)=>{
  
           if(res.data.success){
               
             filterData(res.data.existingpUser,searchkey)
  
           }
   
   });
  
  }
  
  
      return (
          <div>
              
              <h1 style={{color:"#322B5F"}}><b> <center> Pending Requests For Approval</center> </b> </h1>
              
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
                            <a className="btn btn-success" 
                            onClick={() => acceptUser(data)}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Accept Request
                            </a>
                            </td>

                            <td>
                            <a className="btn btn-danger" 
                            onClick={()=> onDelete(data._id)}
                            style={{textDecoration:'none'}}>
                            <i></i>&nbsp;Reject Request
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

import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState,useEffect} from "react";
import axios from 'axios';


export default function CheckMembers() {

    const[request,setRequest] = useState([]);
   

    useEffect(()=>{

           
        axios.get("https://research-management-tool-ym.herokuapp.com/topic").then((res)=>{
                setRequest(res.data.topicRouter);
            }).catch((err)=>{
                alert(err.message);
             })

    },[])


    const setData = (data) => {
        let {groupID,rField,rTopic} = data;

        localStorage.setItem('GroupId',groupID);
        localStorage.setItem('ResearchArea',rField);
        localStorage.setItem('ResearchTopic',rTopic);
       

}

    return (
        <div>
            
            <h1 style={{color:"#322B5F"}}><b> <center> Check Panel Members</center> </b> </h1>
            <br></br>
            <div className = "container">
            <div style={{display:"flex"}}>  
            <table className="table" style={{backgroundColor:"white"}}>

                <thead>
                        <tr>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Number</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Group Id</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Research Area</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Research Topic</th>
                        </tr>

                </thead>
            <tbody>
              {request.map((data,index)=>(
                        
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            
                            <td> {data.groupID} </td>
                            <td> {data.rField} </td>
                            <td> {data.rTopic} </td>
                           
                            <td>
                                
                                <a className="l-btn-accept" style={{width:"200px",fontWeight:"bold",textDecoration:'none'}}
                                onClick={() => setData(data)}
                                href={`/selectpanel`}
                                >
                                <i></i>&nbsp;Check Panel Members
                                </a>
                                </td>

                        </tr>
                        

                ))}
                
                </tbody> 

            </table>
           

</div>  </div>
            
        </div>
    )
}

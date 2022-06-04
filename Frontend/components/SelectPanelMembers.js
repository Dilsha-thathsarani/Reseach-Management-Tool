import React, {useState,useEffect} from "react";
import axios from 'axios';
//import emailjs from 'emailjs-com'



export default function SelectMember() {
    
    
    const[request,setRequest] = useState([]);
    const [GroupId, setGroupId] = useState("");
    const [ResearchArea, setResearchArea] = useState("");
    const [ResearchTopic, setResearchTopic] = useState("");

   

    useEffect(()=>{

        
        setGroupId(localStorage.getItem('GroupId'));
        setResearchArea(localStorage.getItem('ResearchArea'));
        setResearchTopic(localStorage.getItem('ResearchTopic'));

    
            
  

    },[])

    async function getMember(){      
        await axios.get(`https://research-management-tool-ym.herokuapp.com/user/panel/${ResearchArea}`).then((res)=>{
             setRequest(res.data.existingUser);
         }).catch((err)=>{
          })
         }
         getMember()

        const setData = (data) => {
          setGroupId(localStorage.getItem('GroupId'));
          const dId=data._id;
          const email=data.email;
          const name=data.name;
          

          localStorage.setItem('dId',dId);
          localStorage.setItem('GroupId',GroupId);
          localStorage.setItem('ResearchTopic',ResearchTopic);
        
          const panelMembers = {
             
            name,
            email,
            GroupId,
  
        };
    
        axios
          .post(
            "https://research-management-tool-ym.herokuapp.com/panel/add",
             panelMembers
          )
          .then(() => {
            alert("Added New Panel Member");
                                 
          })
          .catch((err) => {
            alert(err);
          });

}

    return (
        <div>
            
            <h1 style={{color:"#322B5F"}}><b> <center> Select Panel Members </center> </b> </h1>
            
            <div style={{marginLeft:"3%"}}>
           <h3> <b> Group ID: {GroupId} </b></h3>
           <h3> <b> Research Topic : {ResearchTopic} </b></h3> </div>
             <br/>
             <center><h3> <b><u> Select Minimum Three Panel Members For A Group.</u></b></h3></center>
            <br/>
             
            <div className = "container">
            
           <table className="table" style={{backgroundColor:"white"}}>

                <thead>
                        <tr>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Number</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Registration Number</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Member Name</th>
                        <th className="tColumn" style={{color:"#322B5F",fontWeight:"bold",fontSize:"24px"}} scope="col">Research Area</th>
                       
                        </tr>

                </thead>
            <tbody>

              {request.map((data,index)=>(
                        
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td> <b> {data.reg_number} </b></td> 
                            <td><b> {data.name} </b> </td> 
                             <td> <b>{data.research_area} </b></td> 
                           
                            <td>
                            <a className="l-btn-accept" style={{width:"200px",fontWeight:"bold",textDecoration:'none'}} 
                            type="submit"
                            onClick={() => setData(data)}
                           
   
                        >
                            <i></i>&nbsp;Allocate for the group
                            </a>
                            </td>

                        </tr>
                        

                ))}
                
                
                </tbody> 

            </table>

            
            <br/> <br/><br/><br/>       
          </div>
          
            
        </div>
    )
}

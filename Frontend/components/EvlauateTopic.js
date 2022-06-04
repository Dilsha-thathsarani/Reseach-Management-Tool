import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState,useEffect} from "react";
import axios from 'axios';
import { useHistory } from 'react-router';
import emailjs from "emailjs-com";
import { Store } from 'react-notifications-component';

export default function EvaluateTopic()  {
    const [tid, settid] = useState();
    const [id, setid] = useState();
    const [groupID, setgroupID] = useState(localStorage.getItem('groupID'));
    const [groupName, setgroupName] = useState();
    const [rField, setrField] = useState(localStorage.getItem('rField'));
    const [rTopic, setrTopic] = useState(localStorage.getItem('rTopic'));
    const [leaderEmail, setleaderEmail] = useState();
    const [comment, setacomment] = useState();
    const [Evaluation, setEvaluation] = useState();
    const[request,setRequest] = useState([]);

    let history = useHistory();

    function authenticate() {

        if((JSON.parse(localStorage.getItem('user')|| "[]")).user_role!="Panel Member"){
            history.push("/login");
            Store.addNotification({
                title: "You are not allowed!",
                message: "You are not allowed to access this page! Please login as Panel Member",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                type: "danger",
                insert: "top",
                container: "top-right",
                
                dismiss: {
                  duration: 2500,
                  onScreen: true,
                  showIcon: true
                },
    
                width:400
            });    
        }
    }
    
    setTimeout(() => {
        authenticate();
    }, 0);

    useEffect(()=>{

        const path = "https://research-management-tool-ym.herokuapp.com/topic/group/"+groupID;
        console.log(path);

        axios.get(path).then((res)=>{
            setRequest(res.data.topicRouter);
            }).catch((err)=>{
                alert("Get Error: ",err.message);
        });

        console.log(request.groupName);



    },[])

    //function to submit data
    

    function submitData(e) {
        e.preventDefault();
        settid("1111");

   
        const newTopic = {
              
            tid,
            groupID,
            groupName,
            rField,
            rTopic,
            leaderEmail,
            comment,
            Evaluation,
        }

        axios.post("https://research-management-tool-ym.herokuapp.com/evaluatedTopic/",newTopic).then(()=>{

            Store.addNotification({
                title: "Evaluation Sent Successfully.",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                type: "success",
                insert: "top",
                container: "top-right",
                
                dismiss: {
                  duration: 1500,
                  onScreen: true,
                  showIcon: true
                },
    
                width:400
            });
            e.target.reset();
                   
            history.push('/EvaluatedTopicList');
            
    
         }).catch((err)=>{
    
            alert("Post ERROR: ",err);
         })
         document.getElementById("subBut").click();
        //  emailjs
        //         .sendForm(
        //             'service_tc03vnm',
        //             'template_ajm9ro9',
        //             e.currentTarget,
        //             '-utNmr2eLLLW4jLyR'
        //         )
        //         .then(
        //             (result) => {
        //             console.log("Mail Sent");
        //             },
        //             (error) => {
        //             console.log(error.text);
        //             }
        //         );

    }

    function sendEmail(e) {
        e.preventDefault();

        emailjs
                .sendForm(
                    'service_tc03vnm',
                    'template_ajm9ro9',
                    e.currentTarget,
                    '-utNmr2eLLLW4jLyR'
                )
                .then(
                    (result) => {
                    console.log("Mail Sent");
                    },
                    (error) => {
                    console.log(error.text);
                    }
                );
    }

    return(
        <div className="topic-container">
            <div style={{backgroundColor:"#0F0934"}}>

                <div>
                    <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
                </div>

                <div className="s-from-container">
                    <form > 
                        <div className="mb-3">
                            <label className="s-form-label" >Group ID</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px"}}  id="cUName"
                                value={request.groupID}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Group Name</label>
                            <input  className="s-input" disabled  type="text"  style={{width:"450px"}}  id="gname"
                                value={request.groupName}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Research Field</label>
                            
                            <input  className="s-input" disabled  type="text"  style={{width:"450px"}}  id="rfield"
                                value={request.rField}
                                />

                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Research Topic</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px"}}  id="rtopic"   
                                value={request.rTopic}
                            />
                           
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Group Leader's email</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px"}}  id="mail"
                                value={request.leaderEmail}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="s-form-label">Comments (Optional)</label>
                            <input className="s-input" disabled type="text"  style={{width:"450px", height:"100px"}}  id="comment"
                                value={request.comment}
                            />
                        </div>
                    </form>       
                </div> 

                

            </div>



            <div style={{backgroundColor:"white"}}>

            <div className="t-list-head-container">
                    <label className="h-text" > EVALUATE</label> <br  />
                    <label className="h-text"> <label style={{color:"#FF5631"}}> RESEARCH</label> PROJECT</label> <br />
                    <label className="h-text">TOPIC</label>
            </div>
            
            <div className="t-from-container" style={{marginLeft:'20%'}}>


                <button className="btn btn-success" style={{backgroundColor:"#00D8BE",fontSize:"2rem",marginLeft:"10%" }}>
                    Download Topic Details
                </button> <br/> <br/>


                <form onSubmit={submitData} >
                        
                        <div className="mb-3">
                            <label className="t-form-label">Comments</label>
                            <input type="text" name="amessage" style={{width:"450px", height:"100px"}}  id="cName"
                                required
                                onChange={(e)=>setEvaluation(e.target.value)}
                            />

                        <input type="hidden" name="amail" style={{width:"450px", height:"100px"}}  id="gid"
                                value={request.leaderEmail}
                                
                            />

                               
                        </div>

                        
                        



                        <button type="submit" className="btn btn-primary" style={{backgroundColor:"#0F0934",width:"200px",fontWeight:"bold",marginLeft:"45%"}} >Submit</button>
                    </form>

                    <form onSubmit={sendEmail}>
                            <input type="hidden" name="mail" value={request.leaderEmail} />
                            <input type="hidden" name="message" value={Evaluation} />
                            <button hidden id="subBut">Send Email</button>
                    </form>

                    <div className="bottom-t-container">
                        <label className="bottom-t" style={{color:"#FF5631"}}> SLIIT</label> <label className="bottom-t"> Research</label> <br />
                        <label className="bottom-t"> Management Tool</label>
                    </div>
            
                </div>

            </div>
        </div>
    );
        


}
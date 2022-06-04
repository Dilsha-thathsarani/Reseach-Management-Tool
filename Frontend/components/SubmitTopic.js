import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState, useEffect}  from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Store } from 'react-notifications-component';

export default function SubmitTopic()  {

    let history = useHistory();

    
    const [tid, settid] = useState();
    const [groupID, setgroupID] = useState();
    const [groupName, setvgroupName] = useState();
    const [rField, setrField] = useState();
    const [rTopic, setrTopic] = useState();
    const [leaderEmail, setleaderEmail] = useState();
    const [comment, setacomment] = useState();


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
        }

        axios.post("https://research-management-tool-ym.herokuapp.com/topic/",newTopic).then(()=>{

            Store.addNotification({
                title: "Topic Saved Successfully.",
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
            history.push('/StdTopicList');
            
    
         }).catch((err)=>{
    
            alert(err);
         })
    

    }






    return(
        <div className="topic-container">
            <div style={{backgroundColor:"#0F0934"}}>

                <div>
                    <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
                </div>

                <div  className="t-title-container">
                    <label className="sideLable" style={{color:"#FF5631"}}>Submit </label> <br className="br12" />
                    <label className="sideLable" style={{marginTop: "-0.5em"}}>Research</label><br  className="br12" />
                    <label className="sideLable" style={{marginTop: "-0.5em"}}>Topic </label> <br className="br12" />
                </div>

                <div className="sublable-container">
                    <label className="subLable">Submit topic of your research project. You can check again the status of the approval.</label>
                </div>
                <br/>
                <lable className="side-btn"> Register Now</lable>

            </div>
            <div style={{backgroundColor:"white"}}>
            
            <div className="t-from-container">
                <form onSubmit={submitData}>
                        <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Group ID</label>
                            <input type="text"  style={{width:"450px"}} className="t-form-control" id="cUName"
                                required
                                onChange={e=>{
                                    setgroupID(e.target.value);
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="t-form-label">Group Name</label>
                            <input type="text"  style={{width:"450px"}}  id="cName"
                                required
                                onChange={e=>{
                                    setvgroupName(e.target.value);
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="t-form-label">Research Field</label>
                            
                            <select className='form-control' name="Field" id="Field" style={{width:"450px",border: "2px solid #ced4da"}}
                                required
                                onChange={e=>{
                                    setrField(e.target.value);
                                }}
                            >
                                <option value="Default">Select one</option>
                                <option value="Artificial Interligance">Artificial Interligance</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Games">Games</option>
                                <option value="Robotics">Robotics</option>
                            </select>

                        </div>

                        <div className="mb-3">
                            <label className="t-form-label">Research Topic</label>
                            <input type="text"  style={{width:"450px"}}  id="cName"   
                                required
                                onChange={e=>{
                                    setrTopic(e.target.value);
                                }}
                            />
                           
                        </div>

                        <div className="mb-3">
                            <label className="t-form-label">Group Leader's email</label>
                            <input type="text"  style={{width:"450px"}}  id="cName"
                                required
                                onChange={e=>{
                                    setleaderEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="t-form-label">Comments (Optional)</label>
                            <input type="text"  style={{width:"450px", height:"100px"}}  id="cName"
                                onChange={e=>{
                                    setacomment(e.target.value);
                                }}
                            />
                        </div>



                        <button type="submit" className="l-btn-accept" style={{width:"200px",fontWeight:"bold"}} >Submit</button>
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
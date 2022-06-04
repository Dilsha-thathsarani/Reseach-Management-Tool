import "./CSS/topicsub.css";
import "./CSS/btrap.css";
//import './CSS/animate.css'
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router';
import { ReactNotifications } from 'react-notifications-component';
//import "./CSS/notification-growl.css";
import { Store } from 'react-notifications-component';



export default function AddMarking()  {

    let history = useHistory();

    const [sid, setSid] = useState("Sample"); //set admin ID
    const [specialization, setSpecialization] = useState(null);
    const [schemeType, setschemeType] = useState(null);
    const [marks, setMarks] = useState(null);
    const [criteria, setCriteria] = useState([]);
    const [extra, setExtra] = useState(null);



    function authenticate() {

        if((JSON.parse(localStorage.getItem('user')|| "[]")).user_role!="Admin"){
            history.push("/login");
            Store.addNotification({
                title: "You are not allowed!",
                message: "You are not allowed to access this page! Please login as Admin",
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
    
    const handleCriteriaInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleCriteria = (e) => {

        Store.addNotification({
            title: "New Criteria Added!",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            type: "default",
            insert: "top",
            container: "top-right",
            
            dismiss: {
              duration: 1500,
              onScreen: true,
              showIcon: true
            },

            width:400
        });

        setCriteria((prev) => [...prev, extra]);
        console.log(criteria);

        document.getElementById('des').value="";
        document.getElementById('mark').value="";


    };


    const handleCreate = async () => {

        let suma = document.getElementById('pCon').textContent;
        let sum = suma.substring(1,3);

        if(sum > 0){
            Store.addNotification({
                title: "Error: You haven't set all marks.",
                message: "Marks to allocate should be '0' before you save.",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                type: "warning",
                insert: "top",
                container: "top-right",
                
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  showIcon: true
                },
    
                width:400
            });
        }
        else if (sum < 0){
            Store.addNotification({
                title: "Error: You have set marks over the limit.",
                message: "Marks to allocate should be '0' before you save.",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                type: "warning",
                insert: "top",
                container: "top-right",
                
                dismiss: {
                  duration: 5000,
                  onScreen: true,
                  showIcon: true
                },
    
                width:400
            });
        }
        else{
            const data = new FormData();
        
        const newMarking = {
            sid,
            specialization,
            schemeType,
            marks,
            criteria,
        };

        axios.post("https://research-management-tool-ym.herokuapp.com/markingScheme/",newMarking).then(()=>{

            Store.addNotification({
                title: "Marking Scheme Saved Successfully.",
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
            history.push('/MarkingList')
            
    
         }).catch((err)=>{
    
            alert(err);
         })
        }
        
    };

    const handleDelete = async (e,i) =>{
        e.preventDefault();

    
        const newList = criteria.filter((item, index) => index !== i);
        setCriteria(newList);


        Store.addNotification({
            title: "Criteria Removed",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            type: "danger",
            insert: "top",
            container: "top-right",
            
            dismiss: {
              duration: 1500,
              onScreen: true,
              showIcon: true
            },

            width:400
        });

               
    };





    return(
        <div className="marking-container">
            <div style={{ backgroundColor: "#0F0934" }}>

                <div>
                    <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
                </div>


            </div>

  


            <div style={{ backgroundColor: "white" }}>
                <div className="t-list-head-container">
                    <label className="h-text"> <label style={{ color: "#FF5631" }}> CREATE</label> MARKING</label> <br className="br1" />
                    <label className="h-text">SCHEME</label>
                    <hr />
                </div>

                <div className="m-from-container">
                    <label style={{ fontWeight: 'bold' }}> General Information</label>
                    <form>
                        <div className="mb-3">
                            <label className="m-form-label">Specialization</label>

                            <select className='form-control m-select' name="Field" id="Field" style={{ color:"#0F0934", fontSize: '0.8rem', width: "450px", border: "2px solid #ced4da", height: "30px" }}
                                onChange={(e) => setSpecialization(e.target.value)}
                                required
                            >
                                <option value="Default">Select one</option>
                                <option value="Artificial Interligance">Artificial Interligance</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Games">Games</option>
                                <option value="Robotics">Robotics</option>
                            </select>

                        </div>

                        <div className="m-sub">

                            <div className="m-sub-container">
                                <div className="mb-3">
                                    <label className="m-form-label" style={{ color: "#322B5F" }}>Scheme Type</label>
                                    <select className='form-control m-select' name="Field" id="Field" style={{ fontSize: '0.8rem', width: "280px", border: "2px solid #ced4da", height: "30px" }}
                                        onChange={(e) => setschemeType(e.target.value)}
                                        required
                                    >
                                        <option value="Default">Select one</option>
                                        <option value="Document">Document</option>
                                        <option value="Presentation">Presentation</option>
                                    </select>
                                </div>

                            </div>
                            <div className="m-sub-container2">
                                <div className="mb-3">
                                    <label className="m-form-label" style={{ color: "#322B5F" }}>Total Marks</label>
                                    <input type="text" style={{ width: "150px", height: "30px" }} className="t-form-control" id="cUName"
                                        required
                                        onChange={(e) => setMarks(e.target.value)} />
                                </div>

                            </div>
                        </div>

                        <label style={{ fontWeight: 'bold' }}> Add New Criteria</label>

                        <div className="mb-3">
                            <label className="m-form-label">Criteria Name</label>
                            <input type="text" name="des" style={{ width: "450px", height: "30px" }} id="des"
                                onChange={handleCriteriaInput} />
                        </div>


                        <div className="mb-3">
                            <label className="m-form-label">Mark Percentage (%)</label>
                            <input type="number" name="mark" style={{ width: "450px", height: "30px" }} id="mark"
                                onChange={handleCriteriaInput} />
                        </div>





                    </form>

                    <button className="btn l-btn-pending" style={{ width: "200px", fontWeight: "bold" }} onClick={handleCriteria}>+ Add criteria</button>
                    <button className="btn l-btn-accepted " style={{ width: "200px", fontWeight: "bold", marginLeft: '20px' }} onClick={handleCreate}> Save</button>

                    <div className="bottom-t-container">
                        <label className="bottom-t" style={{ color: "#FF5631" }}> SLIIT</label> <label className="bottom-t"> Research</label> <br />
                        <label className="bottom-t"> Management Tool</label>
                    </div>

                </div>

            </div>

            <div style={{ backgroundColor: '#D5D3E2' }}>
                <div className="t-list-head-container">
                    <label className="h-text"> <label id="pCon" style={{ color: "#FF5631" }}> {100 - criteria?.map((data) => Number(data.mark.replace("$", ""))).reduce((prev, curr) => prev + curr, 0)} %</label> MARKS</label> <br className="br1" />
                    <label className="h-text">TO ALLOCATE</label>
                </div>

                <div className="t-list-tb-container">

                    <table className="t-table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" style={{ width: '220px' }}>Criteria</th>
                                <th scope="col">Marks (%)</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {criteria.map((data, index) => (

                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {data.des}
                                    </td>
                                    <td>
                                        {data.mark}
                                    </td>

                                    <td>
                                        <button className="btn" style={{ color: "#0F0934" }}
                                            onClick={(e) => handleDelete(e,index)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>




                </div>

            </div>


        </div>
    );
    
    


}
import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router';
import generatePDF from "./Report";
import { Store } from 'react-notifications-component';

export default function EditMarking()  {

    const [id, setId] = useState(null);
    const [sid, setSid] = useState("Sample"); //set admin ID
    const [specialization, setSpecialization] = useState(null);
    const [schemeType, setschemeType] = useState(null);
    const [marks, setMarks] = useState(null);
    const [criteria, setCriteria] = useState([]);
    const [extra, setExtra] = useState(null);

    let history = useHistory();

    useEffect(()=>{
        setId(localStorage.getItem('ID'));
        setSid(localStorage.getItem('sid'));
        setSpecialization(localStorage.getItem('specialization'));
        setschemeType(localStorage.getItem('schemeType'));
        setMarks(localStorage.getItem('marks'));
        setCriteria((JSON.parse(localStorage.getItem('criteria')|| "[]")));
        
    },[])

    console.log("C print " , criteria);
    
    
    
    const handleCriteriaInput = (e) => {
        console.log(e.target.name +":"+ e.target.value)
        setExtra({ ...extra, [e.target.name]: e.target.value });
        console.log(extra);
    };

    const handleCriteria = (e) => {
        document.getElementById('markBox').focus();
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
        document.getElementById('desBox').value="";
        document.getElementById('markBox').value="";

    };


    const handleSave = async () => {

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
            
            const updateMarking = {
                sid,
                specialization,
                schemeType,
                marks,
                criteria,
            };

            axios.put(`https://research-management-tool-ym.herokuapp.com/markingscheme/${id}`,updateMarking).then(()=>{

                Store.addNotification({
                    title: "Marking Scheme Updated Successfully.",
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

    const handleEdit = async (e,desc,mark) =>{
        e.preventDefault();

        document.getElementById('desBox').value=desc;
        document.getElementById('markBox').value=mark;

        const event = new Event("change", { bubbles: true });
        document.getElementById('desBox').focus();
        //document.getElementById('markBox').focus();


        // setExtra({ ...extra, ["des"]: desc});
        // setExtra({ ...extra, ["mark"]: mark});
        

        if(desc!=""){
            const newList = criteria.filter((data) => data.des !== desc);
            setCriteria(newList);
        }
        
    };

    const handleFullDelete = async () => {

        let text = "Are you sure you want to delete?";
        if (confirm(text) == true) {
            axios.delete(`https://research-management-tool-ym.herokuapp.com/markingscheme/${id}`).then(()=>{

                Store.addNotification({
                    title: "Marking Scheme deleted successfully",
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
            history.push('/MarkingList');
            
    
         }).catch((err)=>{
    
            alert(err);
         })
        } 

        
        
    };

   



    return(
        <div className="marking-container">
            <div style={{backgroundColor:"#0F0934"}}>

                <div>
                    <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
                </div>

               
            </div>

            

            <div style={{backgroundColor:"white"}}>
            <div className="t-list-head-container">
                    <label className="h-text"> <label style={{color:"#FF5631"}}> UPDATE</label> MARKING</label> <br className="br1" />
                    <label className="h-text">SCHEME</label>
                    <hr />
            </div>
            
            <div className="m-from-container">
                <label style={{fontWeight:'bold'}}> General Information</label>
                <form >
                        <div className="mb-3">
                            <label className="m-form-label">Specialization</label>
                            
                            <select className='form-control m-select' name="Field" id="Field" style={{fontSize:'0.8rem', width:"450px",border: "2px solid #ced4da", height:"30px"}}
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
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
                                <label className="m-form-label" style={{color:"#322B5F"}}>Scheme Type</label>
                                <select className='form-control m-select' name="Field" id="Field" style={{fontSize:'0.8rem', width:"280px",border: "2px solid #ced4da", height:"30px"}}
                                   value={schemeType}
                                   onChange={(e) => setschemeType(e.target.value)}
                                >
                                <option value="Default">Select one</option>
                                <option value="Document">Document</option>
                                <option value="Presentation">Persentation</option>
                            </select>
                            </div>

                        </div>
                        <div className="m-sub-container2">
                            <div className="mb-3">
                                <label className="m-form-label" style={{color:"#322B5F"}}>Total Marks</label>
                                <input type="text"  style={{width:"150px", height:"30px"}} className="t-form-control" id="cUName"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                />
                            </div>

                        </div>
                        </div>

                        <label style={{fontWeight:'bold'}}> Add New Criteria</label>

                        <div className="mb-3">
                            <label className="m-form-label">Criteria Name</label>
                            <input type="text" name="des" style={{width:"450px", height:"30px"}}  id="desBox"
                                onFocus={handleCriteriaInput}
                                onChange={handleCriteriaInput}
                            />
                        </div>

        
                        <div className="mb-3">
                            <label className="m-form-label">Mark Percentage (%)</label>
                            <input type="text" name="mark" style={{width:"450px", height:"30px"}}  id="markBox"
                                onFocus={handleCriteriaInput}
                                onChange={handleCriteriaInput}
                            />
                        </div>

                        



                    </form>

                    <button  className="btn l-btn-pending" style={{width:"200px",fontWeight:"bold"}} onClick={handleCriteria} >+ Add criteria</button>
                    <br/>
                    <button  className="btn l-btn-accepted" style={{width:"200px",fontWeight:"bold",marginTop:'20px'}} onClick={handleSave} > Save</button>
                    
                    <button  className="btn btn-danger" style={{width:"200px",fontWeight:"bold",marginLeft:'20px',marginTop:'20px'}} onClick={handleFullDelete} > Delete</button>

                    <div className="bottom-t-container">
                        <label className="bottom-t" style={{color:"#FF5631"}}> SLIIT</label> <label className="bottom-t"> Research</label> <br />
                        <label className="bottom-t"> Management Tool</label>
                    </div>
            
                </div>

            </div>

            <div style={{backgroundColor:'#D5D3E2'}}>
                <div className="t-list-head-container">
                        <label className="h-text"> <label id="pCon" style={{color:"#FF5631"}}> {100 - criteria.map((data)=> Number(data.mark.toString().replace("$",""))).reduce((prev,curr)=>prev+curr,0)}%</label> MARKS</label> <br className="br1" />
                        <label className="h-text">TO ALLOCATE</label>       
                </div>

                <div className="t-list-tb-container">

                    <table className="t-table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{width:'220px'}}>Criteria</th>
                            <th scope="col">Marks (%)</th>
                            <th scope="col" >Action</th>
                            <th scope="col" ></th>
                            </tr>
                        </thead>
                        <tbody>

                        {criteria?.map((data,index)=>(

                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>
                                    {data.des}
                                </td>
                                <td>
                                    {data.mark}
                                </td>
                                                                
                                <td>
                                <button className="btn" style={{color:"#0F0934"}} 
                                onClick={(e) =>handleEdit(e,data.des,data.mark)}> 
                                    Edit 
                                </button>
                                </td>

                                <td>
                                <button className="btn" style={{color:"#0F0934"}} 
                                onClick={(e) =>handleDelete(e,index)}> 
                                    X 
                                </button>
                                </td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>

                    <div>
                        <button className="btn l-btn-accepted " onClick={()=>generatePDF(criteria,specialization,schemeType,marks)}> Download as PDF</button>
                    </div>

                                

                
                </div>

            </div>

            
        </div>
    );
        


}
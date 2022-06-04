import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import "./CSS/Editusers.css";
import React, { Component } from 'react'
import axios from 'axios';

export default class ProfileUpdate extends Component {

  constructor(props){

    super(props);
    this.onSubmit = this.onSubmit.bind(this)

    this.state={
       
        name: '',
        email:'',
        mobile:'',
        user_role:'',
        reg_number:'',
        err: '',
        success: ''
      
    }
}
 
onSubmit = (e) =>{

    e.preventDefault();

    const id = this.props.match.params.id;
    
    const { name,email,mobile,user_role,reg_number} = this.state;
     
   
    const data = {

       
        name: name,
        email:email,
        mobile : mobile,
        user_role : user_role,
        reg_number :reg_number,
        
    }

    axios.patch(`https://research-management-tool-ym.herokuapp.com/user/update/${id}`,data).then((res) =>{
        
            alert("Successfully Updated !");
            
            this.setState(
                {
                  
                    name: '',
                    email:'',
                    mobile:'',
                    user_role:'',
                    reg_number:'',
                 
                }
            )
            this.componentDidMount();
           
            
        
    })
}

handleInputChange = (e)=>{
    const {name,value} = e.target;

    this.setState({
        ...this.state,
        [name] :value
    })


}


componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`https://research-management-tool-ym.herokuapp.com/user/infor/${id}`).then((res)=>{
       
            this.setState({
              name : res.data.name,
              email : res.data.email,
              mobile:res.data.mobile,
              user_role: res.data.user_role,
              reg_number: res.data.reg_number,
        
            });
            
    })
 }  




render() {
 return (
    

    <div className="profile">
    <center><h1 className="Hfont">Update User Profile</h1></center>
 
    <br></br>
 <div >
       <form onSubmit={this.onSubmit}>
       <div className="col-md-7 mb-3" style={{display:"flex"}}>
       <div className="col-md-6 mb-3 font" >
        <label htmlFor="license" className="form-label" style={{color:"#322B5F",fontWeight:"bold"}}>
          Name  :
           </label></div>
           <div className="col-md-7 mb-2" >
          <input
           required
           type="text"
           className="form-control"
           name="name"
           value= {this.state.name}
           onChange = {this.handleInputChange}
           
           /></div>
       </div>


       <div className="col-md-7 mb-3" style={{display:"flex"}}>
       <div className="col-md-6 mb-3 font" >
        <label htmlFor="email" className="form-label">
           Email  :
           </label></div>
           <div className="col-md-7 mb-2" >
          <input
           disabled
           type="email"
           className="form-control"
           name="email"
           value= {this.state.email}
           onChange = {this.handleInputChange}
           
           /></div>
       </div>
              

            <div style={{display:"flex"}} className="col-md-7 mb-3">
               <div className="col-md-6 mb-3 font">      
                <label  htmlFor="mobile" className="form-label">
                     Mobile Number :
                 </label></div>
                <div className="col-md-7 mb-2">
                <input
                 type="text"
                 className="form-control"
                 name="mobile"
                 value= {this.state.mobile}
                 required
                 onChange = {this.handleInputChange}
                           />
                       </div></div>


       
                       <div style={{display:"flex"}} className="col-md-7 mb-3" >
                       <div className="col-md-6 mb-3 font">
                   <label htmlFor="user_role" className="form-label">
                    User Role :
                   </label></div>
            <div className="col-md-7 mb-2">      
                 <select
                   className="form-select"
                   name="user_role"
                    value= {this.state.user_role} 
                    onChange = {this.handleInputChange}
                        >
                        
                        <option value={"Student"}>Student</option>
                        <option value={"Supervisor"}>Supervisor</option>
                        <option value={"Co-Supervisor"}>Co-Supervisor</option>
                        <option value={"Admin"}>Admin</option>
                       
                       </select></div>
                    </div> 
                    <br></br><br></br>
                    <center>                      
         <button type="submit" id= "btnupdate" className="btn-update" style={{width:"200px",fontWeight:"bold"}} >
             Update & Save 
             </button> </center>
             <br></br><br></br>
            <hr className="col-md-10 mb-3" />
             </form>
            </div>
            <div className="bottom-profile">
            <label className="bottom-t" style={{color:"#FF5631"}}> SLIIT</label> <label className="bottom-t"> Research</label> <br />
             <label className="bottom-t"> Management Tool</label>
                    </div>
    </div>
        )
    }
}

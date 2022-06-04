import "./CSS/topicsub.css";
import "./CSS/btrap.css";
import React, {useState} from 'react'
import { Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from './utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from './utils/validation/Validation.js';


const initialState = {
  name:'',
  email: '',
  password: '',
  cf_password:'',
  mobile:'',
  user_role:'',
  research_area:'',
  reg_number:'',
  err: '',
  success: ''
}

function Register() {

  const [user, setUser] = useState(initialState)
  const {name,email,password,cf_password,mobile,user_role,research_area,reg_number,err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})

    if( document.getElementById('user_role').value=='Student'){
      document.getElementById('research_area').disabled=true;
    }else{
      document.getElementById('research_area').disabled=false;
    }
}

const history  = useHistory();

const handleSubmit = async e => {
  e.preventDefault()
  
  if(isEmpty(name) || isEmpty(password) || isEmpty(mobile) || isEmpty(reg_number)||isEmpty(reg_number) )
  return setUser({...user, err: "Please fill in all fields.", success: ''})

  if(!isEmail(email))
  return setUser({...user, err: "Invalid email type.", success: ''})

  if(isLength(password))
  return setUser({...user, err: "Password must be at least 8 characters.", success: ''})

  if(!isMatch(password, cf_password))
  return setUser({...user, err: "Passwords did not match.", success: ''})


  const newuser= {name, email, password,mobile,user_role,research_area,reg_number}
  try {
    await axios.post('https://research-management-tool-ym.herokuapp.com/user/register', newuser);
      
      alert("Account Created Successfully!")
      history.push(`/login`)

  } catch (err) {
      err.response.data.msg && 
      setUser({...user, err: err.response.data.msg, success: ''})
  }
}

  return (
    <div className="topic-container">
    <div style={{backgroundColor:"#0F0934"}}>

        <div>
            <img className="img-side" src="https://res.cloudinary.com/sliit-yasantha/image/upload/v1653068950/logo11_ggebb3.png"></img>
        </div>

        <div  className="t-title-container">
            <label className="sideLable" style={{color:"#FF5631"}}>SLIIT </label> <br className="br1" />
            <label className="sideLable" >Research</label><br className="br1" />
            <label className="sideLable" >Management </label> <br className="br1" />
            <label className="sideLable" >Tool. </label> <br className="br1" />
        </div>

        <div className="sublable-container">
            <label className="subLable">Already a member?</label>
        </div>
        <br/>
        <Link to="/login">< button type="submit" className="side-btn">
         Login Here</button></Link>
    </div>
       <div style={{backgroundColor:"white"}}>

       <h1 className="Hfont" style={{color:"#322B5F",fontWeight:"bold"}}>Register Here</h1> 
            <div className="reg-from-container">  

            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            

          <form onSubmit={handleSubmit}>

             <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Full Name</label>
                            <input type="text"  style={{width:"450px"}} className="t-form-control" id="name"
                                placeholder="Enter Name"
                                value={name}
                                name="name"
                                onChange={handleChangeInput}
                                required
                            />
                 </div>

               <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Email Address</label>
                            <input type="email"  style={{width:"450px"}} className="t-form-control" id="email"
                                placeholder="Enter Email"
                                value={email}
                                name="email"
                                onChange={handleChangeInput}
                                required
                            />
                   </div>

               <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Mobile Number</label>
                            <input type="text"  style={{width:"450px"}} className="t-form-control" id="mobile"
                                placeholder="Enter Mobile Number"
                                value={mobile}
                                name="mobile"
                                onChange={handleChangeInput}
                                required
                                   />
                   </div>

               <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Enter Password</label>
                            <input type="password"  style={{width:"450px"}} className="t-form-control" id="password"
                                placeholder="Enter Password(At least 8 characters)"
                                value={password}
                                name="password"
                                onChange={handleChangeInput}
                                required
                            />
                   </div>

              <div className="mb-3">
                            <label className="t-form-label" style={{color:"#322B5F"}}>Confirm Password</label>
                            <input type="password"  style={{width:"450px"}} className="t-form-control" id="cf_password"
                               placeholder="Confirm Password"
                                value={cf_password}
                                name="cf_password"
                                onChange={handleChangeInput}
                                required
                            />
                 </div>

              <div className="mb-3">
                            <label className="t-form-label">Register As</label>
                            
                            <select className='form-control' name="user_role" id="user_role" 
                               style={{width:"450px",border: "2px solid #ced4da"}}
                               value={user_role}
                               onChange={handleChangeInput}
                            >
                                <option value="Default">Select one</option>
                                <option value="Student">Student</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Co-Supervisor">Co-Supervisor</option>
                                <option value="Panel Member">Panel Member</option>
                            </select>
                    
                </div>


              <div className="mb-3">
                  
                            <label className="t-form-label">Most Interested Research Area</label>
                            
                            <select className='form-control' name="research_area" id="research_area" 
                               style={{width:"450px",border: "2px solid #ced4da"}}
                               value={research_area}
                               onChange={handleChangeInput}
                            >
                                <option value="Default">Select one</option>
                                <option value="Artificial Interligance">Artificial Interligance</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Games">Games</option>
                                <option value="Robotics">Robotics</option>
                            </select>

                  </div>


              <div className="mb-3">
                      <label className="t-form-label" style={{color:"#322B5F"}}>Registration Number</label>
                      <input type="text"  style={{width:"450px"}} className="t-form-control" id="reg_number"
                      placeholder="Ex: ITXXXXXXXX / EMPXXXXXX"
                      value={reg_number}
                      name="reg_number"
                      onChange={handleChangeInput}
                      required
                       />
                 </div>

              
                 <button type="submit" className="btn btn-success" style={{width:"200px",fontWeight:"bold"}} >Register</button>
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
export default Register;
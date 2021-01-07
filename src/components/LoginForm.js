import React,{useState} from 'react'
import { useDispatch } from "react-redux"
import { LOGIN_FORM,AUTH_USER } from "../server/actiontypes"
import axios from "axios"
export default function LoginForm() {
    const email_test= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dispatch = useDispatch();
    const [formState, setFormState] = useState("signin")
    const [error, setError] = useState({
        emailId: "",
        username: "",
        mobileNo: "",
        age: "",
        password: "",
        call:""
    })
    const [formdata, setFormData] = useState({
        emailId: "",
        username: "",
        mobileNo: "",
        age: "",
        password:""
    })
    const [formdataSignin, setFormDataSignin] = useState({
        username: "",
        password:""
    })
    const handleFormState=(val) => {
        setFormState(val)
        setError({
            emailId: "",
            username: "",
            mobileNo: "",
            age: "",
            password: "",
            call:""
        })
    }
    const handleSignup =async () => {
        setError({
            emailId: "",
            username: "",
            mobileNo: "",
            age: "",
            password: "",
            call:""
        })
        
            if (formdata.username === "" ||  formdata.username.length < 4) {
                setError({ ...error, username: "Please enter a good username" })
                return;
            }
            if (formdata.emailId === "" || !email_test.test(formdata.emailId)  ) {
                setError({ ...error, emailId: "Please enter valid Email Id" })
                return;
            }
            if (formdata.password === "" ||  formdata.password.length < 4) {
                setError({ ...error, password: "Please enter a good password" })
                return;
            }
            if (formdata.mobileNo === "" || formdata.mobileNo.toString().length !== 10) {
                setError({ ...error, mobileNo: "Please enter valid mobile Number" })
                return;
            }
            if (formdata.age === "") {
                setError({ ...error, age: "Please enter your age" })
                return;
        }
        
      

            await axios.post("https://blogsite1103.herokuapp.com/api/auth/signup", formdata)
                .then(res => {
                    
                  
                    const user = {
                        username: res.data.user_.username,
                        emailId: res.data.user_.emailId,
                        age: res.data.user_.age,
                        mobileNo: res.data.user_.mobileNo,
                        id:res.data.user_._id
                    }
                  
                    dispatch({
                        type: AUTH_USER,
                        payload:{token:res.data.token, user}
                    })

                }).catch((err) => {
                    console.log(err.response)
                    setError({ emailId: "",
                    username: "",
                    mobileNo: "",
                    age: "",
                    password: "",
                        call: err.response.data.message})
            })

       
    }
    const handleSignin = () => {
        
            if (formdataSignin.username === "") {
                setError({ ...error, username: "Please enter the username" })
                return;
            }
            if (formdataSignin.password === "") {
                setError({ ...error, password: "Please enter the password" })
                return;
            }

            axios.post("https://blogsite1103.herokuapp.com/api/auth/signin", formdataSignin)
                .then((res) => {

                    const user = {
                        username: res.data.user_.username,
                        emailId: res.data.user_.emailId,
                        age: res.data.user_.age,
                        id: res.data.user_._id,
                        mobileNo: res.data.user_.mobileNo
                    }
                  
                    dispatch({
                        type: AUTH_USER,
                        payload: { token: res.data.token, user }
                    })
                }).catch((err) => {
                    alert(err.response.data.message)
                }
                )

        
    }
    return (
        <div className="loginform">

            <div className="form">
                {formState === "signup" ?
                    <div className="inputs">
                        <p>Sign up</p>
                        <input className="item"
                            value={formdata.username}
                            type="text" placeholder="Username"
                            onChange={(e) => {
                                setFormData({ ...formdata, username: e.target.value })
                            }} />
                        {error.username && <span className="error-message">{error.username}</span>}
                        <input type="text" className="item" placeholder="Email Id"
                        onChange={(e) => {
                            setFormData({ ...formdata, emailId: e.target.value })
                            }} />
                        {error.emailId && <span className="error-message">{error.emailId}</span>}
                        <input type="password" className="item" placeholder="Password"
                        onChange={(e) => {
                            setFormData({ ...formdata, password: e.target.value })
                            }} />
                        {error.password && <span className="error-message">{error.password}</span>}
                        <input type="number" className="item" placeholder="Mobile No"
                        onChange={(e) => {
                            setFormData({ ...formdata, mobileNo: e.target.value })
                            }} />
                        {error.mobileNo && <span className="error-message">{error.mobileNo}</span>}
                        <input className="item" type="number" placeholder="Age"
                        onChange={(e) => {
                            setFormData({ ...formdata, age: e.target.value })
                            }} />
                        {error.age && <span className="error-message">{error.age}</span>}
                    
                        <p onClick={() => handleSignup()} className="button signup">Sign up</p>
                        {error.call && <span className="error-message">{error.call}</span>}
                        <p className="or">or</p>
                        <p onClick={() => handleFormState("signin")} className="button signin">Sign In</p>
                        <p onClick={()=>{ dispatch({
                        type: LOGIN_FORM,
                      
                    })}} className="button signin">Cancel</p>
                    </div> :
                     <div className="inputs">
                     <p>Sign in</p>
                        <input className="item" type="text" placeholder="Username"
                            value={formdataSignin.username}
                             onChange={(e) => {
                                setFormDataSignin({ ...formdataSignin, username: e.target.value })
                            }}
                        />
                         {error.username && <span className="error-message">{error.username}</span>}
                        <input type="password" className="item" placeholder="Password"
                            value={formdataSignin.password}
                      onChange={(e) => {
                        setFormDataSignin({ ...formdataSignin, password: e.target.value })
                            }} />
                         {error.password && <span className="error-message">{error.password}</span>}
                     <p onClick={()=>handleSignin()} className="button signup">Sign In</p>
                     <p className="or">or</p>
                        <p onClick={() => handleFormState("signup")} className="button signin">Sign Up</p>
                        <p onClick={() =>  {dispatch({
                            type: LOGIN_FORM,
                      
                        })}} className="button signin">Cancel</p>
                 </div>}
                
            </div>
            {/* <p onClick={() => {
                dispatch({
                    type:LOGIN_FORM
                })
            }}>Close</p> */}
        </div>
    )
}

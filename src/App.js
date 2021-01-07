import React,{useEffect} from "react"
import './App.css';
import { Router, Link } from "@reach/router"
import Navbar from "./components/Navbar"
import CategoryBlogs from "./components/CategoryBlogs";
import LoginForm from "./components/LoginForm"
import axios from "axios";
import Backdrop from "./components/Backdrop";
import Profile from "./components/Profile";
import Blog from "./components/Blog";
import Publish from "./components/Publish";
import Home from "./components/Home"
import {AUTH_USER} from "./server/actiontypes"
import {useSelector,useDispatch} from "react-redux"
const token = localStorage.getItem("cofounder");
function App() {
  const state_values = useSelector(state => state.reducerState);
  const { loginform } = state_values
  
  const dispatch = useDispatch();
  useEffect(() => {
  //  console.log(token)
    async function userCall() {
 
      if (token !== "undefined" || token!==null) {
        await axios.get("https://blogsite1103.herokuapp.com/api/auth/me", {
          headers: {
            Authorization: "Bearer " + token
          }
        }).then((res) => {
          const user = {
            username: res.data.user_.username,
            emailId: res.data.user_.emailId,
            age: res.data.user_.age,
            mobileNo: res.data.user_.mobileNo,
            id:res.data.user_._id
        }
      
        dispatch({
            type: AUTH_USER,
            payload:{token:token, user}
        })
        }).catch((err) => {
          
        })
      }
    }
    userCall()
  }, [])
  
  if (localStorage.getItem("cofounder")!="undefined") {
    console.log("xnkd")
  }
  return (
    <div >
     
      <Navbar />
      {loginform && (
        <>
     
          <LoginForm/>
          <Backdrop/>
          </>
      )}
      <Router>
        <Home default/>
        <Home path="/" />
        <Publish path="publish" />
        <Blog path="blog/:id" />
        <Profile path="profile/:id" />
        <CategoryBlogs path="tags/:tagname"/>
      
   </Router>
    </div>
  );
}

export default App;

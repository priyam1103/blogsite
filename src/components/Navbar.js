import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from "react-redux";
import { LOGIN_FORM, LOGOUT_USER } from "../server/actiontypes"
import { Link } from "@reach/router"
export default function Navbar() {
    const state_value = useSelector(state => state.reducerState);
    
    const { user } = state_value;
    console.log(user)
    const [greeting, setGreeting] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const current_hour = new Date().getHours();
        if (current_hour < 12) {
            setGreeting("Good Morning")
        } else if (current_hour < 16) {
            setGreeting("Good Afternoon")
        } else if (current_hour <= 23) {
            setGreeting("Good Evening")
        }

    
    }, [])
    const handleLogin = () => {
        dispatch({
            type: LOGIN_FORM, 
        })
    }
    return (
        <div className="navbar">
            <div className="content">
                <div className="left">
                  <Link to="/" className="brand">  <span >CoFounders Town</span></Link>
                    <span className="part"></span>
                    <span className="greeting">{greeting}</span>
                </div>
                <div className="right">
                    <ul className="options">
                        {localStorage.getItem("cofounder") ?
                          <Link to="/" className="item">  <li  onClick={() => {dispatch({
                                type:LOGOUT_USER
                            })
                            
                            }
                            
                            } >Logout</li></Link> :
                            <li className="item" onClick={() => handleLogin()}>Login</li>}
                        {user.username &&
                            <>
                            <Link to={`/profile/${user.id}`} className="item"> <li >{user.username}</li></Link>
                           <Link to="publish" className="item"> <li >Publish</li></Link>

                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
        
    )
}

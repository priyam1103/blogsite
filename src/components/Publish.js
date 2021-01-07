import React,{useState,useEffect} from 'react'
import axios from "axios";
import Backdrop from "./Backdrop"
import { useDispatch,useSelector } from "react-redux";
import { LOGIN_FORM, LOGOUT_USER } from "../server/actiontypes"
import readingTime from 'reading-time';
import { useNavigate } from "@reach/router"
export default function Publish() {
    const dispatch = useDispatch();
    const [storydata, setStoryData] = useState({
        title: "",
        story: "",
        tagname:""
    })
    const navigate = useNavigate()
    const [reading_time,setReadingTime] = useState({})
    const [publish, setPublish] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("cofounder") === null) {
            navigate("/");
            dispatch({
                type: LOGIN_FORM, 
            })
        }
    },[])
    const handlePublish = async () => {
        await axios.post("https://blogsite1103.herokuapp.com/api/blog/postblog", {...storydata,readtime:reading_time.text}, {
            headers: {
             Authorization:"Bearer "+localStorage.getItem("cofounder")
         }
        }).then((res) => {
            if (res.status === 200) {
             navigate("/")
         }
     })
    }
    return (
        <div className="publish-block">
            {publish && <>
                <Backdrop />
                <div className="publish-card">
                    <div >
                    <p className="text">Select a tag for your story</p>
                <select onChange={(e)=>setStoryData({...storydata,tagname:e.target.value})} className="select-css">
  <option>Select a tag</option>
  <option >Sports</option>
  <option >News</option>
  <option>Technology</option>
  <option>History</option>
                        </select>
                    </div>
                    <div className="contents">
                        <p>Title - {storydata.title}</p>
                        <p>Story - {storydata.story.substr(0, 20)}.....</p>
                        <p className="reading-time">{reading_time.text}</p>
                        <div className="pub-buttons">
                        <button onClick={()=>handlePublish()} className="publish-button">Publish</button>
                            <button onClick={() => setPublish(false)} className="cancel-button">Cancel</button>
                            </div>
                    </div>
                </div>
            </>}
              <button onClick={() => {
                console.log(storydata)
                if (storydata.story.trim() === "" || storydata.story.trim() === "") {
                    
                } else {
                    setReadingTime(readingTime(storydata.story));
                    setPublish(true)
                }
                
            }} className={`${storydata.story.trim()==="" || storydata.title.trim()===""?'publish-button disabled-button':'publish-button'}`} >Publish</button>
            <input type="text" className="title" placeholder="Title"
                onChange={(e)=>{setStoryData({...storydata,title:e.target.value})}}/>
            <textarea placeholder="Tell your story ......" className="story"
                onChange={(e) => { setStoryData({ ...storydata, story: e.target.value }) }} />
          
        </div>
    )
}

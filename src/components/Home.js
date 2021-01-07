import React,{useEffect,useState} from 'react'
import axios from "axios";
import {Link,useNavigate} from "@reach/router"
export default function Home() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        async function fetchBlogs() {
            await axios.get("http://localhost:3004/api/blog/getblogs")
                .then((res) => {
                    setBlogs(res.data.blogs)
            
            })
        }  
        fetchBlogs()
    }, [])
    
    function handleNavigate(val) {
navigate(`tags/${val}`)
        
    }
    return (
        <div>
            <div className="homepage-selection">
                <select onChange={(e) => {handleNavigate(e.target.value) }} className="select-css homepage-slect">
                <option>Search by category</option>
  <option>Sports</option>
  <option >News</option>
  <option>Technology</option>
  <option>History</option>
                </select>
                </div>
            {blogs.map((item, index) => (
                <Link to={`/blog/${item._id}`} key={index} className="blogcard-text">
                <div  className="blog-card">
                    <p>{item.title}</p>
                        <p className="reading-time">{item.readtime} <span>({item.tagname})</span></p>
                    <p>{item.story.substring(0,200)}.......</p>
                    </div>
                    </Link>
            ))}
        </div>
    )
}

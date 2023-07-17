import {React,useState,useEffect} from 'react';
import List from './components/List';
import "./index.css";
import { baseURL } from './utils/constant';
import axios from "axios"
function App() {

  const [input,setInput]=useState("");
 const [tasks,setTasks]=useState([]);

 const [updateUI,setUpdateUI]=useState(false);

 const[updateId,setUpdateId]=useState(null);
 useEffect(()=>{
  axios.get(`${baseURL}/get`)
  .then((res)=>{console.log(res.data);
  setTasks(res.data);
  });

 },[updateUI]);

 const addTask=()=>{
axios.post(`${baseURL}/save`,{task:input})
.then((res)=>{console.log(res.data);
  setInput("");
  setUpdateUI((prevState)=>!prevState);
});
 };

 const updateMode=(id,text)=>{
console.log(text);
setInput(text);
setUpdateId(id);
 }

 const updateTask=()=>{
  axios.put(`${baseURL}/update/${updateId}`,{task:input})
  .then((res)=>{
    console.log(res.data);
    setUpdateUI((prevState)=>!prevState)
    setUpdateId(null);
    setInput("");
  })
 }
  return (
    <div>
    <main>
      <h1 className="title">Crud Operation</h1>
      <div className="input-holder">
        <input type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}/>
        <button type="submit" onClick={updateId ? updateTask: addTask}>
          {updateId ? "Update Task":"Add task"}</button>
        </div>

        <ul>
{tasks.map((task)=>(
  <List key={task._id} 
  id={task._id} 
  task={task.task}
  setUpdateUI={setUpdateUI} 
  updateMode={updateMode}/>
  ))}

    

        </ul>
    </main>
    </div>
  );
}

export default App;



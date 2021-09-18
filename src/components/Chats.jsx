import  React,{useState, useContext, useEffect} from "react"
import {useHistory}  from "react-router-dom"
import {ChatEngine} from "react-chat-engine"
import auth from './Firebase'
import {useAuth} from "../contexts/AuthContext"
import axios from 'axios'

const Chats = () => {
    const history= useHistory()
    //userdata comes from useAuth()
    const {user}= useAuth()
    console.log(user)
    const [loading, setLoading]=useState(true)

    useEffect(
        ()=>{
            if(!user){
                history.push('/')
                 return ;
                 }
                 //Trying to get the existing user
        axios.get('https://api.chatengine.io/users/me', {
                headers:{
                    "project-id":"0e117711-1fee-443a-b134-495151c3f3fb",
                    "user-name": user.email,
                    "user-secret": user.uid
                }
            })
            .then(
                ()=>{setLoading(false)})
              //if the users dont exist , we have to create them  
            .catch(()=>{
                let formdata= new FormData()
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid)

            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name)
                //creation of these users
                axios.post('https://api.chatengine.io/users/me',
                formdata,
                {headers:{"private-key":"f94a02c2-d838-4cd6-a61c-300833abf4a8"}})
                .then(()=>setLoading(false))
                .catch(err=>console.log(err))
            })
            })
        },[user, history]
    )

    //Etant donné que pour la première fois lorsque le comosant est monté, le user n'existe pas...On affiche un message de chargement de la page
    if(!user || loading) return "Loading......"

    const handleLogout= async ()=>{
        await auth.signOut()
        history.push("/")
    }

    const getFile= async (url)=>{
        const response= await  fetch(url);
        //data that contains an image
        const data = await response.blob()

        return new File([data, "userPhoto.jpg",
        {type:'image/jpeg'}])

    }
    return (
       <div className="chats-page">
       <div className="nav-bar">
       <div className="logo-tab"> gofaChat</div>
       <div className="logout-tab" onClick={handleLogout}> Logout</div>
       </div>
       <ChatEngine
       height="calc(100vh - 66px)"
       projectId="0e117711-1fee-443a-b134-495151c3f3fb"
       userName={user.email}
       userSecret={user.uid} />
       </div>

       
    );
};

export default Chats;
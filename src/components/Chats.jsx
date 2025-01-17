import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';
import auth from '../firebase'

import { useAuth } from '../contexts/AuthContext'
import axios from "axios";

const Chats = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        await auth.signOut()
        navigate('/')
    }
    
    const getFile = async (url) => {
        const response = await fetch(url);
        const data= await response.blob();
        
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' })
    }
    
    useEffect(() => {
        // if(!user){
            //     navigate('/')
            //     return;
            // }
            axios.get('https://api.chatengine.io/users/me/', {
                headers: {
                    "project-id":import.meta.env.VITE_CHAT_ENGINE_ID,
                    "user-name": user.displayName,
                    "user-secret": user.uid,
                }
            })
            .then(() => setLoading(false))
            .catch(e => {
                let formdata = new FormData()
                formdata.append('email', user.email);
                formdata.append('username', user.displayName);
                formdata.append('secret', user.uid);
                
                getFile(user.photoURL)
                .then(avatar => {
                    formdata.append('avatar', avatar, avatar.name)
                    
                    axios.post('https://api.chatengine.io/users/', 
                    formdata, { headers: { "private-key":import.meta.env.VITE_CHAT_ENGINE_KEY }}
                    )
                    .then(() => setLoading(false))
                    .catch(error => console.log('e', e.response))
               
                })
        })
    }, [user, navigate])
    
    if(!user || loading) return "Loading..."

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ReChat
                </div>
                <div onClick={handleLogout} className="button-20 logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine 
            height='calc(100vh - 66px)'
            projectID={import.meta.env.VITE_CHAT_ENGINE_ID}
            userName={user.displayName}
            userSecret={user.uid}
            />
        </div>
    )
}


    // <button class="" role="button">Button 20</button>
    

    

export default Chats
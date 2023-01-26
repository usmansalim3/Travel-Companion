import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import {firebase} from "../auth/Firebase-config"


export const authContext=createContext();
export default function AuthContextProvider({children}){
    const[user,setUser]=useState("");
    const[reg,setReg]=useState(false);
    const[error,setError]=useState('');
    const[signError,setSignError]=useState('');
    const[save,setSave]=useState(false);
    const[show,setShow]=useState(false);
    const[limit,setLimit]=useState(0);
    async function signIn(email,password){
    try{
        await firebase.auth().signInWithEmailAndPassword(email,password);
    }catch(e){
        setSignError(e.toString());
    }
    }
    async function register(email,password){
        try{
            setReg(true);
            await firebase.auth().createUserWithEmailAndPassword(email,password);
        }catch(e){
            setReg(false)
            setError(e.toString());
        }
    }
    useEffect(()=>{
        const sub=firebase.auth().onAuthStateChanged((user)=>setUser(user));
        return sub;
    },[])
    async function signOut(){
         await firebase.auth().signOut();
         setReg(false);
    }
    value={
        signIn,
        register,
        user,
        setUser,
        signOut,
        error,
        setError,
        signError,
        setSignError,
        save,
        setSave,
        show,
        setShow,
        reg,
        setReg,
        limit,
        setLimit
    }
    return(
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
}
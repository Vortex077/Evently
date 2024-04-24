import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const OwnerContext  = createContext({});

export function OwnerContextProvider({children}){
    const[owner,setOwner]=useState(null);
    const[ready,setReady]=useState(false);
    useEffect(()=>{
        if(!owner){
            axios.get('/ownerprofile').then(({data})=>{
                setOwner(data); 
                setReady(true);
            });
        }
    },[]);
    return(
        <OwnerContext.Provider value={{owner,setOwner}}>
            {children}
        </OwnerContext.Provider>
    );
}
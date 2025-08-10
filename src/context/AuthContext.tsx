import React,{createContext, useContext, useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';// onAuthStateChanged is a firebase listener that updates user info on login/logout, during log in , it fetches user role from firestore users collection.
import {auth, db} from '../firebase/firebaseConfig';
import { doc, getDoc} from 'firebase/firestore';
import type{ User } from 'firebase/auth';
import type{ ReactNode} from 'react';


interface AuthContextType{
    user: User | null;
    role: string |null;
    loading: boolean;

}
const AuthContext = createContext<AuthContextType| undefined>(undefined);

export const AuthProvider = ({children}:{children: ReactNode}) =>{
    const [user,setUser]=useState<User|null>(null);
    const [role,setRole]=useState<string|null>(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,async (firebaseUser)=>{
            setUser(firebaseUser);
            if (firebaseUser){
                // fetch role from firestore
                const docRef = doc(db, 'users', firebaseUser.uid);
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    setRole(docSnap.data().role);
                }
                else{
                    setRole(null);
                }
            } else{
                setRole(null);

            }
            setLoading(false);
            
        });
        return () => unsubscribe();
       },[]);

       return (
        <AuthContext.Provider value={{user,role,loading}}>
            {children}
        </AuthContext.Provider>
       );
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if (context===undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
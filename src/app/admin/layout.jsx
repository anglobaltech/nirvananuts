"use client"
import React, { Children, useEffect } from 'react'
import AdminLayout from './component/AdminLayout'
import AuthContextProvider, { useAuth } from '../../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'


const layout = ({children}) => {
    return (
        <div>
            <AuthContextProvider>
                <AdminChecking>{children}</AdminChecking>
            </AuthContextProvider>
            
        </div>
    )
}

function AdminChecking({children}) {
    const CircularProgress = dynamic(
  () => import("@nextui-org/react").then((mod) => mod.CircularProgress),
  { ssr: false }
);
    const {user, isLoading}=useAuth();
    const router= useRouter();
    useEffect(()=>{
        if(!user && !isLoading){
            router.push("/login");
        }
    },[user, isLoading]);

    if(isLoading){
        return(
            <div className="h-screen w-screen flex justify-between items-center"><CircularProgress aria-label="Loading..."/></div>
        )
    }

    if(!user) {
        return (
        <div className="h-screen w-screen flex justify-between items-center"><h1>Please Login First!</h1>
        </div>
    )
    }
    return <AdminLayout>{children}</AdminLayout>
}

export default layout

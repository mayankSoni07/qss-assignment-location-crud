import React from 'react';
import { ToastContainer } from 'react-toastify';

export default function Toaster(){
    return <ToastContainer 
        closeOnClick={true}
        pauseOnHover={true}
        newestOnTop={true}
    />
}

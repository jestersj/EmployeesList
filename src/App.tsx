import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import AppRouter from "@/routes/AppRouter";

const App = () => {
    return (
        <>
            <Navbar/>
            <AppRouter/>
        </>
    );
};

export default App;
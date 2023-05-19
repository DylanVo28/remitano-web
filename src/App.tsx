import React from 'react';
import Home from "./pages/home"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Header from "./components/Header";
import ShareURL from "./pages/shareURL";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Header/>
                <Home/>
            </>

        ),
    },
    {
        path: "/share-movie",
        element: (
            <>
                <Header/>
                <ShareURL/>
            </>
        )
    }
]);
const App = () => {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;

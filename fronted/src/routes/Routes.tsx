import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import AppLayout from "../components/AppLayout";
import About from "../pages/About";
import ShowCompetition from "../features/competitions/components/ShowCompetition";

const router = createBrowserRouter([
    {
        element: <AppLayout/>, 
        children: [
            {
                index: true,
                element: <Home/>                
            },
            { path: "competitions/:competitionID", element: <ShowCompetition/> },
            { path: "about", element: <About /> },
        ]
    }  
]);

export default router;

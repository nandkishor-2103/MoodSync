import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected.jsx";
import Home from "./features/home/pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home/></Protected>,
    },

    {
        path: "/login",
        element: <Login/>,
    },

    {
        path: "/register",
        element: <Register/>,
    }
]);

export default router;

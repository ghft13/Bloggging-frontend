import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Blog from "./Components/Blog";
import Blogpage from "./Components/Blogpage";
import Edit from './Components/Edit'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/Blog",
      element: <Blog />,
    },
    {
      path: "/Blogpage",
      element: <Blogpage />,
    },
    {
      path: "/Edit/:id",
      element: <Edit/>,
    },
  ]);


  return <RouterProvider router={router} />;
}

export default App;

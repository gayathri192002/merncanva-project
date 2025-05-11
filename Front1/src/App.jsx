import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Project from "./component/Project.jsx";
import Home from "./component/Home.jsx";

import Createdesign from "./component/Createdesign.jsx";
import Main from "./pages/Main.jsx";
import Index from "./pages/Index.jsx";
import { token_decode } from "./utils/index.js";
import Layout from './pages/Layout';

const userInfo = token_decode(localStorage.getItem('canva_token'));



const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo?<Layout/>:<Index/>,
    children:[
      {
      path:'/home',
      element:<Home/>
      },
      
      {
        path:'/project',
        element:<Project/>
      }
    ]
  },
  {
    path:'/design/create',
    element:<Createdesign/>
  },
  {
    path:"/design/:design_id/edit",
    element:<Main/>
  },


])

function App() {
  return <RouterProvider router={router} />;
}

export default App;

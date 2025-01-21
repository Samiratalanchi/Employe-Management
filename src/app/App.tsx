import "../index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "../pages/login/Login.tsx"
import Dashboard from "../pages/dashboard/dashboard.tsx"
import { UserProvider } from "../context/User.context.tsx"
import Users from "../pages/users/users.tsx"
import CreateUser from "../pages/createUser/CreateUser.tsx"
import EditUser from "../pages/editUser/editUser.tsx"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/users",
      element: <Users />
    },
    {
      path: "/createuser",
      element: <CreateUser />
    },
    {
      path: "/edituser/:id",
      element: <EditUser />
    }
  ])

  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
      
    </>
  )
}

export default App

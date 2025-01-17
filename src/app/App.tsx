import "../index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from "../pages/login/Login.tsx"
import Dashboard from "../pages/dashboard/dashboard.tsx"
import { UserProvider } from "../context/User.context.tsx"

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />
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

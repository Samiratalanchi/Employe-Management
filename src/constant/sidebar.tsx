import { MdDashboard } from "react-icons/md";
import { CiViewTable } from "react-icons/ci";


const sideBar: any[] = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard className="h-6 w-6 shrink"/> },
    { name: "Users", path: "/users", icon: <CiViewTable className="h-6 w-6 shrink"/>}
]

export default sideBar
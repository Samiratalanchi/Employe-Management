import { useState } from "react"
import { useLocation } from "react-router-dom"



import DesktopLayout from "./desktopLayout"
import MobileLayout from "./mobileLayout";


const DashboardLayout = ({ children }:{children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();

    const openSideBar = () : void => {
        setIsOpen(!isOpen)
    }

    const activePage = location.pathname;

    return (
        <>
            <DesktopLayout buttonClick={openSideBar} activePage={activePage}/>
            {children}
            <MobileLayout isOpen={isOpen} closeSideBar={openSideBar} activePage={activePage}/>
        </>
        
    )
}

export default DashboardLayout
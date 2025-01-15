import DesktopLayout from "./desktopLayout"

const DashboardLayout = ({ children }:{children: React.ReactNode}) => {
    return (
        <>
            <DesktopLayout />
            {children}
        </>
        
    )
}

export default DashboardLayout
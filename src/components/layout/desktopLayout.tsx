import { Link } from "react-router-dom"
import sideBar from "../../constant/sidebar"
import logo from "../../images/logo/logo.png"

const DesktopLayout = () => {
    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col font-semibold">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            className="h-8 w-auto"
                            src={logo}
                            alt="Your Company" />
                        <h1 className="text-white ml-2 text-[15px]">Quera Employ Management</h1>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    { sideBar.map((item:any,key) => (
                                        <Link className="bg-gray-900 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                              to={item.path}
                                              key={key}
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z" />
                    </svg>
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-white">
                    Dashboard
                </div>
            </div>
        </>
    )
}

export default DesktopLayout
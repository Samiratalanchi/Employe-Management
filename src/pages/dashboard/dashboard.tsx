import React from "react";
import logo from "../../images/logo/logo.png"
import DashboardLayout from "../../components/layout/dashboardLayout"

const Dashboard = () => {
    return (
        <>
            <DashboardLayout>
                <main className="py-10 lg:pl-72 font-semibold">
                    <div className="px-4 sm:px-6 lg:px-8">
                    <h1 className="text-red text-3xl">Dashboard</h1>
                    <div className="grid grid-cols-12  mt-10 w-2/3 ">
                        <div className="border border-gray-400 p-3 rounded bg-[#F3F3F7] col-span-6 mb-3 mr-3">
                        <div className="flex justify-between gap-4">
                            <div className="col-span-2">
                            <h3 className="text-[#5D5D6C] text-md">Total Employees</h3>
                            <p className="text-2xl mb-1">100</p>
                            </div>
                            <div className="col-span-1 items-center bg-[#0099CC] rounded w-[60px] h-[60px] p-2 ">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white w-full h-full"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx={12} cy={8} r={5} />
                                <path d="M20 21a8 8 0 1 0-16 0" />
                            </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </main>
            </DashboardLayout>
            
        </>

    )
}

export default Dashboard
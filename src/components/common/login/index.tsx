import React, {useState} from "react";
import users from "../../../constant/users.json";
import logo from "../../../images/logo/logo.png"
import { setItem } from "../../../core/storage/storage.ts";
import { useNavigate } from "react-router-dom";

const LoginHolder = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean | null >(null);
    const navigate = useNavigate();

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const userExist: any[] = users.filter((user) => (user.username === userName || user.email === userName) && user.password === password)
        if (userExist.length > 0) {
            setItem("userData",JSON.stringify(userExist[0]))
            setSuccess(true)
            setTimeout(() => {
                navigate("/dashboard")
            },3000); 
        } else {
            setSuccess(false)
        }
    }
    return (
        <div className="flex  flex-col justify-center items-center h-full py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-10 w-auto"
                    src={logo}
                    alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign In To Quera Employe Management
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" action="#" method="POST" onSubmit={submitForm}>
                        <div>
                            <label
                                htmlFor="Username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="Username"
                                    name="Username"
                                    type="text"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-red-500 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#0099CC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginHolder;
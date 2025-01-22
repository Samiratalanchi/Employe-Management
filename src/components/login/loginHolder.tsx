import {useState} from "react";
import users from "../../constant/users.json";
import logo from "../../images/logo/logo.png"
import { setItem } from "../../core/storage/storage.ts";
import { useNavigate } from "react-router-dom";
import LoginForm from "./loginForm/LoginForm.tsx";
import Alert from "../common/alert/alert.tsx";

const LoginHolder = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean | null >(null);
    const navigate = useNavigate();

    const submitForm = () => {
        const userExist: any[] = users.filter((user) => (user.username === userName || user.email === userName) && user.password === password)
        if (userExist.length > 0) {
            setItem("userData",JSON.stringify(userExist[0]))
            setSuccess(true)
            setTimeout(() => {
                navigate("/dashboard")
            },1500); 
        } else {
            setSuccess(false)
        }
    }
    return (
        <>
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
                    {success && <Alert message="Login Successful"/>}
                    {success === false && <Alert error={true} title="Username or Password is Wrong"/>}
                    <LoginForm setUserName={setUserName} setPassword={setPassword} submitForm={submitForm} />
                </div>
            </div>
        </>
    )
}

export default LoginHolder;
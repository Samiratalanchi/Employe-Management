import React from "react";
import InputForm from "../../InputForm";

interface ILoginFormProps {
    setUserName: (e: any) => void,
    setPassword: (e: any) => void,
    submitForm: () => void,
}

const LoginForm: React.FC<ILoginFormProps> = ({setUserName,setPassword, submitForm}) => {
    return (
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="space-y-6">
                <InputForm label="Username" type="text" onChange={setUserName} />
                <InputForm label="Password" type="password" onChange={setPassword} />
                <div>
                    <button
                        type="submit"
                        onClick={submitForm}
                        className="flex w-full justify-center rounded-md bg-[#0099CC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
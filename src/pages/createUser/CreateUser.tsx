import InputForm from "../../components/common/InputForm"
import SelectInput from "../../components/common/selectInput"
import DashboardLayout from "../../components/layout/dashboardLayout"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setItem } from '../../core/storage/storage'
import { useUsers } from '../../context/User.context'
import IUserInterface from '../../core/interfaces/IUserInterfaces'
import Alert from '../../components/common/alert/alert'
import Button from "../../components/common/button"

const CreateUser = () => {
    const { users, setUsers } = useUsers();
    const [userName, setUserName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    const [gender, setGender] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [userCreated, setUserCreated] = useState<boolean>(false)
    const navigate = useNavigate()

    const createUser = () => {
        const user : IUserInterface = {
            id: users.length + 1,
            username: userName, email, position,
            isActive: true,
            password,
            isChecked: false,
            personalInfo: {
                first_name: firstName,
                last_name: lastName,
                age: age,
                gender: gender
            }
        }
        setUserCreated(true)
        setUsers([...users, user])
        setItem("users", JSON.stringify(users))
        setTimeout(() => {
            navigate('/users')
        }, 3000);

    }

    const cancelProccess = () => {
        setUserName("");
        setEmail("");
        setPosition("");
        setFirstName("");
        setLastName("");
        setAge(0);
        setGender(false);
        setPassword("");
        navigate('/users')
    }

    return (
        <DashboardLayout>
            <h1>Create User</h1>
            <main className="py-10 lg:pl-72 px-10 font-semibold">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share.
                            </p>
                            {userCreated && <Alert message="User Created Successfully" />}
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <InputForm label='Username' type={'text'} value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="sm:col-span-2">
                                    <InputForm label={'Email Address'} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="sm:col-span-2">
                                    <InputForm label='Position' type={'text'} value={position} onChange={(e) => setPosition(e.target.value)} />
                                </div>  
                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <InputForm label={'First Name'} type={'text'} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="sm:col-span-3">
                                    <InputForm label={'Last Name'} type={'text'} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div className="sm:col-span-3">
                                    <InputForm label={'Age'} type={'number'} value={String(age)} onChange={(e) => setAge(Number(e.target.value))} />
                                </div>
                                <div className="sm:col-span-3">
                                    <SelectInput
                                        value={gender ? "male" : "female"}
                                        title={"Gender"}
                                        options={[{
                                            title: "male", value: "male"
                                        },
                                        {
                                            title: "female", value: "female"
                                        }]}
                                        id={"gender"}
                                        onChange={(e) => setGender(e === "male")}
                                     />
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <InputForm label='Password' type={'password'} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-3">
                        <Button onClick={cancelProccess} className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400">
                            Cancel
                        </Button>
                        <Button
                            onClick={createUser}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    )
}

export default CreateUser
import React,{useState, useEffect, useContext, createContext} from "react";
import UserJson from "../constant/users.json"
import { IUSerInterface } from "../core/interfaces/IUserInterfaces";
import { getItem } from "../core/storage/storage";


const UserContext = createContext<{
    users: IUSerInterface[],
    setUsers: React.Dispatch<React.SetStateAction<IUSerInterface[]>>
}>({users: [], setUsers: () => { },});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const userWithCheckBox = UserJson.map((user: IUSerInterface) => ({ ...user, isChecked: false}))

    const [users, setUsers] = useState<IUSerInterface[]>(userWithCheckBox)

    useEffect(() => {
        const userExist = getItem("users")
        if (userExist) {
            const parseUsers = JSON.parse(userExist).map((user: IUSerInterface) => ({...user,isChecked: false}))

            setUsers(parseUsers);
        } else {
            setUsers(userWithCheckBox);
        }
    }, [])
    return (
        <UserContext.Provider value={{ users, setUsers }}>{children}</UserContext.Provider>

        
    )
}

export const useUsers = () => useContext(UserContext)
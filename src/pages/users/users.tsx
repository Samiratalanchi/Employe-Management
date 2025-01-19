import { useState, useEffect } from "react"
import IUserInterface from "../../core/interfaces/IUserInterfaces"
import DashboardLayout from "../../components/layout/dashboardLayout"
import { useUsers } from "../../context/User.context";
import SortingOptions from '../../components/users/sortingOption'
import UserTable from '../../components/users/userList/userList'
import Pagination from "../../components/pagination/pagination";
import UserJson from "../../constant/users.json"
import { Link } from "react-router-dom";
import { getItem, setItem } from "../../core/storage/storage";

const Users = () => {

    const usersWithCheckbox = UserJson.map((user: IUserInterface) => ({
        ...user,
        isChecked: false
    }))

    const { users, setUsers } = useUsers()

    const [allChecked, setAllChecked] = useState<boolean>(false)
    const [sortByName, setSortByName] = useState<any>('');
    const [sortByGender, setSortByGender] = useState<string>('');
    const [sortByPosition, setSortByPosition] = useState<string>('');
    const [sortByStatus, setSortByStatus] = useState<any>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const [currentUsers, setCurrentUsers] = useState<IUserInterface[]>([])

    useEffect(() => {
        setCurrentUsers(users.slice(indexOfFirstItem, indexOfLastItem));
    }, [users, currentPage, itemsPerPage]);

    useEffect(() => {
        const userExist = getItem('users')
        if (userExist) {
            setUsers(JSON.parse(userExist))
        }
        else {
            setUsers(usersWithCheckbox)
        }
    }, [])

    const toggleAllCheckboxes = () => {
        const updatedUsers = users.map((user: any) => ({ ...user, isChecked: !allChecked }));
        setUsers(updatedUsers);
        setAllChecked(!allChecked);
    };

    const toggleCheckbox = (id: number) => {
        const updatedUsers = users.map((user: any) => user.id === id ? { ...user, isChecked: !user.isChecked } : user);
        setUsers(updatedUsers);
    };

    const sortByNameHandler = (input: string) => {
        setSortByName(input)
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) =>
            input === "asc" ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
        );
        setUsers(sortedUsers);
    };
    const sortByPositionHandler = (input: string) => {
        setSortByPosition(input)
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) =>
            input === "asc" ? a.position.localeCompare(b.position) : b.position.localeCompare(a.position)
        );
        setUsers(sortedUsers);
    };
    const sortByStatusHandler = (input: string) => {
    
        setSortByStatus(input);
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) => {
            if (input === "active") {
                return (a.isActive === b.isActive) ? 0 : a.isActive ? -1 : 1;
            } else {
                return (a.isActive === b.isActive) ? 0 : a.isActive ? 1 : -1;
            }
        });
        setUsers(sortedUsers);
    };
    
    
    const setSortByGenderHandler = (input: string) => {
        console.log(input)
        setSortByGender(input);
        const sortedUsers = [...users];
        sortedUsers.sort((a, b) => {
            if (input === "male") {
                return (a.personalInfo.gender === b.personalInfo.gender) ? 0 : a.personalInfo.gender ? -1 : 1;
            } else {
                return (a.personalInfo.gender === b.personalInfo.gender) ? 0 : a.personalInfo.gender ? 1 : -1;
            }
        });
        setUsers(sortedUsers);
    };

    const searchInTableHandler = (value: string) => {
        if (!value) {
            setUsers(usersWithCheckbox);
        } else {
            const filteredUsers = users.filter(user =>
                user.username.toLowerCase().includes(value.toLowerCase()) ||
                user.position.toLowerCase().includes(value.toLowerCase()) ||
                user.email.toLowerCase().includes(value.toLowerCase())
            );
            setUsers(filteredUsers);
        }
    }

    const deleteUserHandler = (id: number) => {
        const newUser: IUserInterface[] = users.filter(user => user.id !== id);
        setItem("users", JSON.stringify(newUser));
        setUsers(newUser)
    }


    return (
        <DashboardLayout>
            <main className="py-10 lg:pl-72 font-semibold">
                <div className="px-4 sm:px-6 lg:px-8">
                    <h1 className='text-red text-3xl'>Users</h1>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the users in your account including their name, title,
                                    email and role.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <Link 
                                    to={'/createuser'}
                                    className="block rounded-md bg-[#0099CC] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
                                >
                                    Add user
                                </Link>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                        <SortingOptions
                                sortByName={sortByName}
                                sortByPosition={sortByPosition}
                                sortByStatus={sortByStatus}    
                                setSortByName={sortByNameHandler}
                                setSortByPosition={sortByPositionHandler}
                                setSortByStatus={sortByStatusHandler}
                                setSortByGender={setSortByGenderHandler}
                                sortByGender={sortByGender}
                                onSearchChange={searchInTableHandler}
                        />
                        <UserTable
                            users={currentUsers}
                            allChecked={allChecked}
                            onCheckAll={toggleAllCheckboxes}
                            onCheck={toggleCheckbox}
                            deleteUser={deleteUserHandler}
                        />
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </main>
        </DashboardLayout>

    )
}
export default Users
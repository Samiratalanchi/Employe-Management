import { useState, useEffect } from "react"
import IUserInterface from "../../core/interfaces/IUserInterfaces"
import DashboardLayout from "../../components/layout/dashboardLayout"
import { useUsers } from "../../context/User.context";
import SortingOptions from '../../components/users/sortingOption'
import UserTable from '../../components/users/userList/userList'

const Users = () => {
    const { users: initialUsers } = useUsers();
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [allChecked, setAllChecked] = useState<boolean>(false)
    const [sortByName, setSortByName] = useState<any>('');
    const [sortByTitle, setSortByTitle] = useState<any>('');
    

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    const toggleAllCheckboxes = () => {
        const updatedUsers = users.map(user => ({ ...user, isChecked: !allChecked }));
        setUsers(updatedUsers);
        setAllChecked(!allChecked);
    };

    const toggleCheckbox = (id: number) => {
        const updatedUsers = users.map(user => user.id === id ? { ...user, isChecked: !user.isChecked } : user);
        setUsers(updatedUsers);
    };

    const handleSortChange = (key: 'name' | 'title', value: string) => {
        if (key === 'name') {
            setSortByName(value);
            setSortByTitle('');
        } else {
            setSortByTitle(value);
            setSortByName('');
        }
    };

    const compareUsers = (a: IUserInterface, b: IUserInterface, key: 'username' | 'position', order: string) => {
        return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    };

    const getSortedUsers = () => {
        return [...users].sort((a, b) => {
            if (sortByName) return compareUsers(a, b, 'username', sortByName);
            if (sortByTitle) return compareUsers(a, b, 'position', sortByTitle);
            return 0;
        });
    };

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
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add user
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                        <SortingOptions
                                sortByName={sortByName}
                                sortByTitle={sortByTitle}
                                onSortChange={handleSortChange}
                            />
                            <UserTable
                                users={getSortedUsers()}
                                allChecked={allChecked}
                                onCheckAll={toggleAllCheckboxes}
                                onCheck={toggleCheckbox}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>

    )
}
export default Users
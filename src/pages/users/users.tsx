import { useState, useEffect } from "react"
import IUserInterface from "../../core/interfaces/IUserInterfaces"
import DashboardLayout from "../../components/layout/dashboardLayout"
import { useUsers } from "../../context/User.context";
import SortingOptions from '../../components/users/sortingOption'
import UserTable from '../../components/users/userList/userList'
import Pagination from "../../components/pagination/pagination";

const Users = () => {
    const { users: initialUsers } = useUsers();
    const [users, setUsers] = useState<IUserInterface[]>([]);
    const [allChecked, setAllChecked] = useState<boolean>(false)
    const [sortByName, setSortByName] = useState<any>('');
    const [sortByTitle, setSortByTitle] = useState<any>('');
    const [sortByStatus, setSortByStatus] = useState<any>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(users.length / itemsPerPage);

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

    const handleSortChange = (key: 'name' | 'title' | 'status', value: string) => {
        if (key === 'name') {
            setSortByName(value);
            setSortByTitle('');
            setSortByStatus('');
        } else if (key === 'title') {
            setSortByTitle(value);
            setSortByName('');
            setSortByStatus('');
        } else if (key === 'status'){
            setSortByStatus(value);
            setSortByName('');
            setSortByTitle('');
        }
    };

    const compareUsers = (a: IUserInterface, b: IUserInterface, key: 'username' | 'position' | 'status', order: string) => {
        if (key === 'status') {
            const valA = a.isActive ? 1 : 0;
            const valB = b.isActive ? 1 : 0;
        return order === 'asc' ? valB - valA : valA - valB;
    }
        return order === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
    };

    const getSortedUsers = () => {
        const sortedUsers = [...users].sort((a, b) => {
            if (sortByName) return compareUsers(a, b, 'username', sortByName);
            if (sortByTitle) return compareUsers(a, b, 'position', sortByTitle);
            if (sortByStatus) return compareUsers(a, b, 'status', sortByStatus);
            return 0;
        });
        return sortedUsers.slice(indexOfFirstItem, indexOfLastItem)
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers.map(number => (
            <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === number ? 'bg-[#0099CC] text-white' : ''}`}
            >
                {number}
            </button>
        ));
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
                                    className="block rounded-md bg-[#0099CC] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
                                >
                                    Add user
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                        <SortingOptions
                                sortByName={sortByName}
                                sortByTitle={sortByTitle}
                                sortByStatus={sortByStatus}    
                                onSortChange={handleSortChange}
                        />
                        <UserTable
                            users={getSortedUsers()}
                            allChecked={allChecked}
                            onCheckAll={toggleAllCheckboxes}
                            onCheck={toggleCheckbox}
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
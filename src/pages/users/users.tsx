import { useState, useEffect } from "react"
import IUSerInterface from "../../core/interfaces/IUserInterfaces"
import DashboardLayout from "../../components/layout/dashboardLayout"
import tableCol from "../../constant/tableCol";
import { useUsers } from "../../context/User.context";

const Users = () => {
    const { users: initialUsers } = useUsers();
    const [users, setUsers] = useState<IUSerInterface[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [sortByName, setSortByName] = useState<any>('');
    const [sortByTitle, setSortByTitle] = useState<any>('');
    

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    const checkAllHandler = () => {
        const areAllChecked = users.every(user => user.isChecked);
        setUsers(users.map(user => ({
            ...user,
            isChecked: !areAllChecked
        })));
        setIsChecked(!isChecked)
    };

    const checkHandler = (id: string) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                return { ...user, isChecked: !user.isChecked }
            }
            return user
        }))
    }

    const handleSortNameChange = (e: any) => {
        setSortByName(e.target.value);
        setSortByTitle(null);
    };

    const handleSortTitleChange = (e: any) => {
        setSortByTitle(e.target.value);
        setSortByName(null);
    };

    const compareByCriteria = (a: any, b: any, key: any, order: any) => {
        if (order === 'asc') {
            return a[key].localeCompare(b[key]);
        } else if (order === 'desc') {
            return b[key].localeCompare(a[key]);
        }
        return 0;
    };

    const sortedUsers = [...users].sort((a, b) => {
        let result = 0;
        if (sortByName) {
            result = compareByCriteria(a, b, 'name', sortByName);
        }
        if (result === 0 && sortByTitle) {
            result = compareByCriteria(a, b, 'position', sortByTitle);
        }
        return result;
    });

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
                            <div className='flex flex-wrap gap-6 items-center mb-6'>
                                <div>
                                    <label htmlFor="Sort By Name" className="block text-sm font-medium leading-6 text-gray-900">Sort By Name</label>
                                    <select value={sortByName} onChange={handleSortNameChange} id="sortByName" name="name" className="outline-none mt-1 block w-full  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                        <option value={'default'}>Select Option</option>
                                        <option value="name-asc">Name (A to Z)</option>
                                        <option value="name-desc">Name (Z to A)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="Sort By Title" className="block text-sm font-medium leading-6 text-gray-900">Sort By Title</label>
                                    <select value={sortByTitle} onChange={handleSortTitleChange} id="sortByTitle" name="title" className="outline-none mt-1 block w-full  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                        <option value=''>Select Option</option>
                                        <option value="asc">Title (A to Z)</option>
                                        <option value="desc">Title (Z to A)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <div className="relative">
                                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                                        <input
                                                            type="checkbox"
                                                            onChange={checkAllHandler}
                                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Role
                                                    </th>
                                                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">Status</th>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {sortedUsers.map((user: IUSerInterface) => (
                                                    <tr key={user.id || user.email}>
                                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                                            <input
                                                                type="checkbox"
                                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                checked={user.isChecked}
                                                                onChange={() => checkHandler(user.id)}
                                                            />
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                                                            {user.username}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {user.position}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {user.email}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            Member
                                                        </td>
                                                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                                                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                                                {user.isActive ?
                                                                <>
                                                                    <div className="flex-none rounded-full p-1 text-green-400 bg-green-400/10">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                                                                    </div>
                                                                    <div className="hidden text-black sm:block">Active</div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex-none rounded-full p-1 text-rose-400 bg-rose-400/10">
                                                                        <div className="h-1.5 w-1.5 rounded-full bg-current"></div>
                                                                    </div>
                                                                    <div className="hidden text-black sm:block">Error</div>
                                                                </>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                            <a
                                                                href="#"
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>

    )
}
export default Users
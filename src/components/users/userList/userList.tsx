import React from 'react'

import IUserInterface from '../../../core/interfaces/IUserInterfaces';
import tableCol from '../../../constant/tableCol'

import UserTableProps from '../../../core/types/UserTable.type';

const UserList: React.FC<UserTableProps> = ({ users, allChecked, onCheckAll, onCheck }) => {
    return(
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="relative">
                    <table className="min-w-full table-fixed divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                    <input
                                        type="checkbox"
                                        checked={allChecked}
                                        onChange={onCheckAll}
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </th>
                                {tableCol.map((item,index) => (
                                    <th
                                    key={index}
                                    scope="col"
                                    className="min-w-[12rem] px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                    {item}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users.map((user: IUserInterface) => (
                                <tr key={user.id || user.email}>
                                    <td className="relative px-7 sm:w-12 sm:px-6">
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            checked={user.isChecked}
                                            onChange={() => onCheck(user.id)}
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
                                    {user.personalInfo.gender ? "🙎🏻‍♂️Male" : "🙎🏻‍♀️Female"}
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
    )
}



export default UserList
import IUserInterface from "../interfaces/IUserInterfaces";

type UserTableProps = {
    users: IUserInterface[];
    allChecked: boolean;
    onCheckAll: () => void;
    onCheck: (id: any) => void;
    deleteUser: (id: any) => void;
};

export default UserTableProps

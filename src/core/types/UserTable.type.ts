import IUserInterface from "../interfaces/IUserInterfaces";

type UserTableProps = {
    users: IUserInterface[];
    allChecked: boolean;
    onCheckAll: () => void;
    onCheck: (id: number) => void;
};

export default UserTableProps

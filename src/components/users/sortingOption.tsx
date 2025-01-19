import SelectInput from "../common/selectInput";

interface ISortingOptionsProps  {
    sortByName: string;
    sortByTitle: string;
    sortByStatus: string;
    onSortChange: (key: 'name' | 'title' | 'status', value: string) => void;
};

const SortingOptions: React.FC<ISortingOptionsProps> = ({ sortByName, sortByTitle, sortByStatus, onSortChange }) => {
    const sortByNameOptions = [{
        title: "Name (A to Z)", value: "asc"
    },
    {
        title: "Name (Z to A)", value: "desc"
    }]
    const sortByTitleOptions = [{
        title: "Title (A to Z)", value: "asc"
    },
    {
        title: "Title (Z to A)", value: "desc"
    }]
    const sortByStatusOptions = [{
        title: "Status (Active First)", value: "asc"
    },
    {
        title: "Status (Not Active First)", value: "desc"
    }]
    
    return (
        <div className='grid grid-cols-3 mb-3 w-1/2 gap-3'>
            <SelectInput
                value={sortByName}
                onChange={(key, value) => onSortChange('name', value)}
                title={"Sort By Name"}
                options={sortByNameOptions}
                id={"sortByName"}
            />
            <SelectInput
                value={sortByTitle}
                onChange={(key, value) => onSortChange('title', value)}
                title={"Sort By Title"}
                options={sortByTitleOptions}
                id={"sortByTitle"}
            />
            <SelectInput
                value={sortByStatus}
                onChange={(key, value) => onSortChange('status', value)}
                title={"Sort By Status"}
                options={sortByStatusOptions}
                id={"sortByStatus"}
            />
        </div>
    )
}

export default SortingOptions
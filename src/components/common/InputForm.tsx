const InputForm = ({label, type, onChange} : {label: string,type:string, onChange: (e: any) => void }) => {
    return (
        <div>
            <label
                htmlFor={label}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={label}
                    name={label}
                    type={type}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    )
}

export default InputForm;
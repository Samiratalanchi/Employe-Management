import IInputInterfaces from "../../core/interfaces/IInputinterfaces"

const InputForm: React.FC<IInputInterfaces> = ({ label, labelClassName, type, className, onChange }) => {
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
                    onChange={onChange}
                    autoComplete="current-password"
                    className={`outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${className}`}
                />
            </div>
        </div>
    )
}

export default InputForm;
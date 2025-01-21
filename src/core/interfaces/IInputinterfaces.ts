interface IInputInterfaces{
    label:string,
    labelClassName?:string,
    type:string,
    className?:string
    value?: string
    onChange?:(e:any)=> any;
}

export default IInputInterfaces
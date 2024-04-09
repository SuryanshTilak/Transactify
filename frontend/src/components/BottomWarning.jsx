import { NavLink } from "react-router-dom"
export function BottomWarning({label,linkText,to}){
    return(<>
    <div className="flex">
        <div>
            {label}
        </div>
        <div>
            <NavLink className="cursor-pointer hover:text-green-600 underline" to={to}>
                {linkText}
            </NavLink>
        </div>
    </div>
    </>)
}
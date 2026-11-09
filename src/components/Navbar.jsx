import {NavLink} from "react-router-dom";

const links=[
    {to: "/dashboard",label:"Dashboard"},
    {to: "/applications",label:"Applications"},
    {to: "/explore",label:"Explore Jobs"},
];

function Navbar(){
    return(
        <nav className="bg-white shadow">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-4">
                <span className="text-xl font-bold text-blue-600">JobTracker</span>

                <div className="flex flex-wrap gap-2">
                    {links.map((link)=>(
                        <NavLink key={link.to}
                        to={link.to}
                        className={({isActive})=>
                        `px-3 py-1 rounded ${
                            isActive ? "bg-blue-600 text white" : "text-gray-700 hover:bg-gray-100"

                        }`
                    }
                    >
                        {link.label}
                    </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    )
}
export default Navbar;
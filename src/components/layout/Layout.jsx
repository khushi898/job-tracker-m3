import {Outlet} from "react-router-dom";
import Navbar from "../Navbar.jsx";

function Layout(){
    return(
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-6xl mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}
export default Layout;
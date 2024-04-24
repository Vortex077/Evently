import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, useParams, Navigate } from "react-router-dom";
import axios from "axios"; // Import axios for logout functionality
import VenuesPage from "./VenuesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    
    // Default to 'profile' subpage if undefined
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    // Redirect if necessary
    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    // Redirect when needed
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <AccountNav />
            {user && subpage === 'profile' && (
                <div className="max-w-lg mx-auto mt -4 my-8 p-6 bg-lavender rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Username</label>
                            <input
                                type="text"
                                value={user.username}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input
                                type="email"
                                value={user.email}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">First Name</label>
                            <input
                                type="text"
                                value={user.firstname}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Last Name</label>
                            <input
                                type="text"
                                value={user.lastname}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {/* Logout button */}
                        <button
                            onClick={logout}
                            type="button"
                            className="w-full mt-4 bg-primary text-white py-2 rounded-md"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            )}
            {subpage === 'places' && (
                <VenuesPage />
            )}
        </div>
    );
}

'use client';

import { useSession, signOut, signIn } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";

export const LogoutButton = () => {
    const { data, status } = useSession();

    if (status === 'loading') {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoShieldOutline />
                <span className="group-hover:text-gray-700">Wait...</span>
            </button>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={() => signIn()}>
            <CiLogout />
            <span className="group-hover:text-gray-700">Enter</span>
        </button>
        )
    }

    return (
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" onClick={() => signOut()}>
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>
    )
}
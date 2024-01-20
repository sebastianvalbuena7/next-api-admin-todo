'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
    const { data } = useSession();

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div>
            <h1>Hello Profile</h1>
            <hr />

            <div className="flex flex-col">
                <span>{data?.user?.email ?? 'No email'}</span>
                <span>{data?.user?.name ?? 'No name'}</span>
                <span>{data?.user?.image ?? 'No image'}</span>
            </div>
        </div>
    );
}
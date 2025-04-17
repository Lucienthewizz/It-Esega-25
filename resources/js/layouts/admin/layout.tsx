import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { UsePermission } from '@/utils/permission';


export default function Authenticated({ children, user }) {

    // const { auth } = usePage().props;
    const { hasRole } = UsePermission();

    return (
        <>
            <div className='relative'>
                {children}
                {/* <Navbar user={user} />
                <ScrollToTop />
                <Footer /> */}
            </div>
        </>
    );
}

import React, { createContext, useContext, useState } from "react";

export const AdminContext = createContext({
    isAdmin: false,
    setIsAdmin: (val: boolean) => { }
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

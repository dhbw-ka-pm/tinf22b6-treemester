import { Outlet } from "react-router";
import Navigation from "./Navigation";

function Layout() {
    return(
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

export default Layout;
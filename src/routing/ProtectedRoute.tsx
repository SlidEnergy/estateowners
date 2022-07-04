import {Navigate, Outlet} from "react-router-dom";
import {FC, ReactNode} from "react";

interface IProtectedRouteProps {
    isAllowed: boolean,
    redirectPath: string,
    children?: ReactNode
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
                            isAllowed,
                            redirectPath,
                            children
                        }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return (children ? <>{children}</> : <Outlet />);
};
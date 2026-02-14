
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    if (user) {
        return children;
    } else {
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }
};

export default PrivateRoute; 
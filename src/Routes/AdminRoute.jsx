import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ForbiddenPage from '../Components/ForbiddenPage';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <div className=" min-h-[calc(100vh-285px)] flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    if (role === 'admin') {
        return children;
    } else {
        return <ForbiddenPage></ForbiddenPage>
    }
};

export default AdminRoute;
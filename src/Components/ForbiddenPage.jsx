import { useNavigate } from 'react-router';

const ForbiddenPage = () => {
    const navigate = useNavigate();

    return (
        <div className="hero min-h-[calc(100vh-64px)] bg-base-200">
            <title>LibGo_Forbidden</title>
            <div className="hero-content text-center">
                <div className="max-w-md">

                    <h1 className="text-8xl sm:text-9xl font-bold text-error">403</h1>

                    <h2 className="text-4xl font-bold mt-4 text-base-content">
                        Access Forbidden
                    </h2>

                    <p className="py-6 text-base-content/70">
                        Sorry, you do not have permission to view this page. You may have accessed an incorrect link, or you need administrator permission.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">


                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Go Back
                        </button>


                        <button
                            onClick={() => navigate('/')}
                            className="btn btn-primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Go Home
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;
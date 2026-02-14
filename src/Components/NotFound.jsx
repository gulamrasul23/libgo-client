import { Link } from 'react-router';
const NotFound = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <title>LibGo_Not_found</title>
            <div className="max-w-md w-full space-y-8 text-center lg:max-w-4xl lg:text-left lg:flex lg:items-center lg:space-y-0 lg:space-x-12">
                <div className="lg:w-1/2 flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 500 500"
                        className="w-full max-w-sm h-auto text-indigo-600"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path fill="#E0E7FF" d="M250 450c110.457 0 200-89.543 200-200S360.457 50 250 50 50 139.543 50 250s89.543 200 200 200z" opacity=".5" />
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="8" d="M170 250h160M250 170v160" />
                            <circle cx="250" cy="250" r="40" fill="currentColor" opacity=".2" />
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="12" d="M150 150L350 350M350 150L150 350" opacity=".8" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="140" fontWeight="bold" className="text-indigo-800">404</text>
                        </g>
                    </svg>
                </div>

                <div className="lg:w-1/2 lg:pl-10 mt-8 lg:mt-0">
                    <h2 className="text-4xl font-extrabold text-primary sm:text-5xl">
                        Oops! Page not found.
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Sorry, the page you are looking for does not exist or may have been moved.
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start">
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
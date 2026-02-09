
import { Outlet } from 'react-router';
import Navbar from '../Pages/Home/Shared/Navbar';
import Footer from '../Pages/Home/Shared/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl  mx-auto'>
            <header><Navbar></Navbar></header>
            <main className='min-h-[calc(100vh-254px)]'><Outlet></Outlet></main>
            <footer><Footer></Footer></footer>
        </div>
    );
};

export default RootLayout;
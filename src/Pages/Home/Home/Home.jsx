import { useQuery } from '@tanstack/react-query';
import Banner from './Banner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import BookCard from '../../../Components/BookCard';
import { use } from 'react';
import Type from './Type';
import Coverage from './Coverage';
import bg from '../../../assets/bg.png'

const typesPromise = fetch('/genre.json').then(res => res.json());

const Home = () => {

  const types = use(typesPromise);
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books', 6],
    queryFn: async () => {
      const res = await axiosSecure.get('/books?limit=6');
      return res.data;
    }
  })

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="text-base-content overflow-hidden">
      <title>LibGo_Home</title>

      <Banner></Banner>

      <BookCard books={books}></BookCard>

      <Type types={types}></Type>

      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose BookCourier?</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl border-b-4 border-transparent hover:border-secondary transition-all duration-300 group">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="card-title ">Lightning Fast</h3>
                <p className="text-gray-500 text-sm">Same-day delivery in metro areas. We value your reading time.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border-b-4 border-transparent hover:border-secondary transition-all duration-300 group">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" /></svg>
                </div>
                <h3 className="card-title ">Mint Condition</h3>
                <p className="text-gray-500 text-sm">Eco-friendly bubble wrap ensures your books arrive pristine.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl border-b-4 border-transparent hover:border-secondary transition-all duration-300 group">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                </div>
                <h3 className="card-title ">Huge Database</h3>
                <p className="text-gray-500 text-sm">From bestsellers to rare independent publishers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Coverage></Coverage>

      <section className="relative py-24 overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 z-0">
          <img
            src={bg}
            alt="Library Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/90"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-14 shadow-2xl text-center">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              Join the Literary Circle
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
              Unlock a world of stories. Subscribe for exclusive author interviews, curated lists, and receive <span className="text-yellow-400 font-semibold">15% OFF</span> your first literary treasure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-4 bg-white/90 text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-lg"
                />
              </div>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-6 tracking-wider uppercase">
              No spam, just stories. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
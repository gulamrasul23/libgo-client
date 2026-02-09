import React, { use } from 'react';
import Map from './Map';

const coveragePromise = fetch('/division.json').then(res => res.json());
const centersPromise = fetch('/warehouses.json').then(res => res.json());

const Coverage = () => {
    const coverages = use(coveragePromise);
    const centers = use(centersPromise);
    return (
        <div>
            <section className="py-10 max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex flex-col lg:flex-row  gap-10">
          
          <div className="w-full lg:w-1/3">
            <h2 className="text-3xl font-bold text-primary mb-6">Delivering Happiness to Every Doorstep</h2>
            <p className="text-gray-600 mb-6">Our network spans across major cities and remote towns. Use our tracker to see delivery estimates in your area.</p>
            
            <ul className="space-y-5 grid grid-cols-2">
               {coverages.map((coverage,index) => (
                <div key={index}>
                     <li  className="flex items-center gap-3">
                   <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-xs">✓</span>
                   <span className="font-medium">{coverage}</span>
                 </li>
                </div>
               ))}
            </ul>
          </div>


          <Map centers={centers}></Map>
        </div>
      </section>
        </div>
    );
};

export default Coverage;
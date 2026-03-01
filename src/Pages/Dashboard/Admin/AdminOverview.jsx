import React from 'react';
import { Users, BookOpen, ShoppingBag, Clock } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const booksCategoryData = [
  { name: 'Fiction', value: 400 },
  { name: 'Science', value: 300 },
  { name: 'History', value: 300 },
  { name: 'Technology', value: 250 },
];

// Pie Chart color
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const AdminOverview = () => {
    const axiosSecure = useAxiosSecure();
   
  const { data: dashboardData ={}, isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });
  const { statsData, monthlyOrdersData, userGrowthData } = dashboardData;
  
  const tooltipStyle = {
    backgroundColor: 'oklch(var(--b1))',
    borderColor: 'oklch(var(--b3))',
    color: 'oklch(var(--bc))',
    borderRadius: '8px',
  };
 
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-red-500 font-bold">Failed to load dashboard data!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
       
        <div>
          <h1 className="text-3xl text-primary font-bold ">Dashboard Overview</h1>
          <p className="text-base-content/60 mt-1">Welcome back, Admin! Here is what's happening today.</p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-primary/10 text-primary rounded-lg">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-base-content/60 text-sm font-semibold">Total Books</p>
              <h3 className="text-2xl font-bold text-base-content">{statsData.totalBooks}</h3>
            </div>
          </div>

          
          <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-secondary/10 text-secondary rounded-lg">
              <Users size={28} />
            </div>
            <div>
              <p className="text-base-content/60 text-sm font-semibold">Total Users</p>
              <h3 className="text-2xl font-bold text-base-content">{statsData.totalUsers}</h3>
            </div>
          </div>

          
          <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-accent/10 text-accent rounded-lg">
              <ShoppingBag size={28} />
            </div>
            <div>
              <p className="text-base-content/60 text-sm font-semibold">Total Orders</p>
              <h3 className="text-2xl font-bold text-base-content">{statsData.totalOrders}</h3>
            </div>
          </div>

          
          <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-warning/10 text-warning rounded-lg">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-base-content/60 text-sm font-semibold">Pending Orders</p>
              <h3 className="text-2xl font-bold text-base-content">{statsData.pendingOrders}</h3>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
            <h3 className="text-lg font-bold text-base-content mb-6">Monthly Orders Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrdersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-base-300 opacity-50" />
                  <XAxis dataKey="name" stroke="currentColor" className="text-base-content/70 text-xs" />
                  <YAxis stroke="currentColor" className="text-base-content/70 text-xs" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
            <h3 className="text-lg font-bold text-base-content mb-6">User Growth Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-base-300 opacity-50" />
                  <XAxis dataKey="name" stroke="currentColor" className="text-base-content/70 text-xs" />
                  <YAxis stroke="currentColor" className="text-base-content/70 text-xs" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Registered Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300 lg:col-span-2">
            <h3 className="text-lg font-bold text-base-content mb-6">Books Distribution by Category</h3>
            <div className="h-[350px] w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={booksCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {booksCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
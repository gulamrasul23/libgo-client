import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const MyInvoice = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: invoices = [] } = useQuery({
    queryKey: ["invoice", user.email, "paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/invoices?email=${user.email}&paymentStatus=paid`,
      );
      return res.data;
    },
  });

  //   const invoices = [
  //     {
  //       id: 1,
  //       paymentId: "TXN_102394",
  //       bookName: "Introduction to Algorithms",
  //       amount: 15.00,
  //       date: "2026-02-08",
  //       status: "Paid"
  //     },
  //     {
  //       id: 2,
  //       paymentId: "TXN_102395",
  //       bookName: "Clean Code",
  //       amount: 12.50,
  //       date: "2026-02-07",
  //       status: "Paid"
  //     },
  //     {
  //       id: 3,
  //       paymentId: "TXN_102396",
  //       bookName: "The Great Gatsby",
  //       amount: 8.00,
  //       date: "2026-02-05",
  //       status: "Pending"
  //     },
  //     {
  //       id: 4,
  //       paymentId: "TXN_102397",
  //       bookName: "System Design Interview",
  //       amount: 20.00,
  //       date: "2026-02-01",
  //       status: "Paid"
  //     },
  //   ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-200/60 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            History of your payments and book rentals.
          </p>
        </div>

        {/* Invoice Table Card */}
        <div className="bg-base-100 shadow-sm rounded-lg overflow-hidden border border-gray-200">
          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse ">
              <thead>
                <tr className="bg-base-300 border-b border-gray-200 text-xs uppercase  font-semibold">
                  <th className="p-4 whitespace-nowrap">Book Name</th>
                  <th className="p-4 whitespace-nowrap">Payment ID</th>
                  <th className="p-4 whitespace-nowrap">Date</th>
                  <th className="p-4 whitespace-nowrap">Amount ($)</th>
                  {/* <th className="p-4 whitespace-nowrap text-center">Status</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    {/* Book Name */}
                    <td className="p-4 text-sm  font-medium whitespace-nowrap">
                      {invoice.bookTitle}
                    </td>

                    {/* Payment ID */}
                    <td className="p-4 text-sm font-mono  whitespace-nowrap">
                      {invoice.transactionId}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-sm  whitespace-nowrap">
                      {new Date(invoice.paidAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </td>

                    {/* Amount */}
                    <td className="p-4 text-sm  font-bold  whitespace-nowrap">
                      ${invoice.amount.toFixed(2)}
                    </td>

                    {/* Status Badge */}
                    {/* <td className="p-4 text-center whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State (Optional: Jodi data na thake) */}
          {invoices.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No invoices found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInvoice;

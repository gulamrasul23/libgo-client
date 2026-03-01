import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const MyInvoice = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoice", user.email, "paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/invoices?email=${user.email}&paymentStatus=paid`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-285px)] flex items-center justify-center bg-base-100">
        <span className="loading loading-bars loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-200/60 p-4 md:p-8">
      <title>LibGo_My_Invoice</title>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            History of your payments and book rentals.
          </p>
        </div>
        <div className="bg-base-100 shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse ">
              <thead>
                <tr className="bg-base-300 border-b border-gray-200 text-xs uppercase  font-semibold">
                  <th className="p-4 whitespace-nowrap">Book Name</th>
                  <th className="p-4 whitespace-nowrap">Payment ID</th>
                  <th className="p-4 whitespace-nowrap">Date</th>
                  <th className="p-4 whitespace-nowrap">Amount ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="p-4 text-sm  font-medium whitespace-nowrap">
                      {invoice.bookTitle}
                    </td>
                    <td className="p-4 text-sm font-mono  whitespace-nowrap">
                      {invoice.transactionId}
                    </td>
                    <td className="p-4 text-sm  whitespace-nowrap">
                      {new Date(invoice.paidAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 text-sm  font-bold  whitespace-nowrap">
                      ${invoice.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

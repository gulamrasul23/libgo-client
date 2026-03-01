import React from 'react';

const Faq = () => {
    return (
        <div>
           <section className="py-8 pb-16  px-4 md:px-12 max-w-full bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-base-content">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-base text-base-content/70 mt-2">
              Find answers to common questions about our Library to home delivery services.
            </p>
          </div>

          <div className="join join-vertical w-full bg-base-100 shadow-xl border border-base-200 rounded-xl overflow-hidden">
            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-lg font-medium flex items-center gap-3">
                <span className=" text-primary bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </span>
                What is LibGo and how does it work?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  LibGo is a modern platform... (Insert your specific answer here). We strive to provide the best experience for our users.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-lg font-medium flex items-center gap-3">
                <span className="text-primary bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
                How can I create an account here?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  Click on the 'Sign Up' button at the top right corner and provide the necessary details to easily create your account.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-lg font-medium flex items-center gap-3">
                <span className="text-primary bg-primary/10 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </span>
                Are there any hidden fees?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                  Transparency is our policy. All potential fees (including
                  taxes, service charges, and agent commissions) are listed
                  explicitly in the book details section before you proceed.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-b border-base-200">
              <input type="checkbox" name="my-accordion-4" />
              <div className="collapse-title sm:text-lg font-medium flex items-center gap-3">
                <span className="text-primary bg-primary/10 p-2 rounded-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  
                </span>
                What is the payment and refund policy?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 pt-2 pl-14">
                 We support various secure payment gateways. To request a refund, you must apply within 3 days according to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        </div>
    );
};

export default Faq;
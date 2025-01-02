// components/AuthLayout.js
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        {/* Common Section */}
        <div className="max-md:order-1 bg-gray-50 h-full md:h-[100vh]">
          <img
            src="/images/reg2.jpg"
            className="h-full w-full block mx-auto"
            alt="auth-page-image"
          />
        </div>

        {/* Dynamic Section */}
        <div className="flex items-center p-6 h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;

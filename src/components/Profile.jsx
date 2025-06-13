import React from 'react';
import ownerImage from '../assets/images/user/owner.jpg';
import { useAdmin } from '../hooks/useAdmin';

function Profile() {
  const { adminData } = useAdmin(); // Get admin data from the hook
  const pageName = "Profile";

  // Early return if no admin data
  if (!adminData) {
    return (
      <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
        <div className="text-center py-8">Loading admin data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
      {/* Breadcrumb Start */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav>
            <ol className="flex items-center gap-1.5">
              <li>
                <a className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400" href="index.html">
                  Home
                  <svg className="stroke-current" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </a>
              </li>
              <li className="text-sm text-gray-800 dark:text-white/90">{pageName}</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Breadcrumb End */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>

        <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <img src={ownerImage} alt="user" />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  {adminData.name}
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {adminData.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <InfoField label="Name" value={adminData.name} />
              <InfoField label="Email address" value={adminData.email} />
              <InfoField label="Phone" value={adminData.mobile} />
              <InfoField label="Role" value={adminData.role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Component
const InfoField = ({ label, value }) => (
  <div>
    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
      {label}
    </p>
    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
      {value || 'N/A'}
    </p>
  </div>
);

export default Profile;
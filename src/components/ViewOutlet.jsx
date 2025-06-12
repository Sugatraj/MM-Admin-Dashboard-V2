import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useAdmin } from "../hooks/useAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

function ViewOutlet() {
  const { getToken } = useAuth();
  const { adminData } = useAdmin();
  const [outletData, setOutletData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOutletDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://men4u.xyz/v2/common/view_outlet",
        {
          outlet_id: 1, // This should come from route params or props
          user_id: adminData?.user_id,
          app_source: "admin_dashboard",
        },
        {
          headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.detail === "Successfully retrieved outlet details") {
        setOutletData(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch outlet details");
      console.error("Error fetching outlet details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminData?.user_id) {
      fetchOutletDetails();
    }
  }, [adminData?.user_id]); // This ensures the API is called only once when adminData is available

  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            {outletData?.name}
          </h2>
          <nav>
            <ol class="flex items-center gap-1.5">
              <li>
                <a
                  class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                  href="index.html"
                >
                  Home
                  <svg
                    class="stroke-current"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke=""
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </a>
              </li>
              <li
                class="text-sm text-gray-800 dark:text-white/90"
                x-text="pageName"
              >
                Profile
              </li>
            </ol>
          </nav>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white/90"
              x-text="pageName"
            >
              Manage Staff Details
            </h2>
          </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">  
          {/* Metric Item Start */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 my-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon 
                    icon={faUserTie} 
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Waiters</p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    2
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Metric Item End */}
          {/* Metric Item Start */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">
              Total Pageviews
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  55.9K
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                  +4%
                </span>
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Vs last month
                </span>
              </div>
            </div>
          </div>
          {/* Metric Item End */}
          {/* Metric Item Start */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">
              Bounce Rate
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  54%
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-1 rounded-full bg-error-50 px-2 py-0.5 text-theme-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
                  -1.59%
                </span>
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Vs last month
                </span>
              </div>
            </div>
          </div>
          {/* Metric Item End */}
          {/* Metric Item Start */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <p className="text-theme-sm text-gray-500 dark:text-gray-400">
              Visit Duration
            </p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                  2m 56s
                </h4>
              </div>
              <div className="flex items-center gap-1">
                <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-theme-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                  +7%
                </span>
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">
                  Vs last month
                </span>
              </div>
            </div>
          </div>
          {/* Metric Item End */}
        </div>
      </div>
    </>
  );
}

export default ViewOutlet;

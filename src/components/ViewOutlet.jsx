import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useAdmin } from "../hooks/useAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faUtensils,
  faUserGroup,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

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
                View Outlet
              </li>
            </ol>
          </nav>
          
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            {outletData?.name}
          </h2>
        </div>

        
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6 mt-6">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Basic Information
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {/* Waiters Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Outlet Name
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.name}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Chefs Metric */}
          {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email Address
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.chef_count}
                  </h4>
                </div>
              </div>
            </div>
          </div> */}

          {/* Captains Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mobile Number
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.mobile}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Address
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.address}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  WhatsApp
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.whatsapp}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Outlet Type
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.outlet_type?.charAt(0).toUpperCase() + outletData?.outlet_type?.slice(1)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6 mt-6">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Business Details
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {/* Waiters Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Food Type
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.veg_nonveg?.charAt(0).toUpperCase() + outletData?.veg_nonveg?.slice(1)}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Service Charges
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.service_charges}%
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  GST
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.gst}%
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Opening Hours
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.opening_time}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Closing Hours
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.closing_time}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Outlet Status
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.outlet_status === 1 ? "Active" : "Inactive"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currently
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.is_open === 1 ? "Open" : "Closed"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  FSSAI Number
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.fssainumber}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  GST Number
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.gstnumber}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                  UPI ID
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.upi_id}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div class="flex flex-wrap items-center justify-between gap-3 my-6">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Manage Staff Details
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {/* Waiters Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Waiters
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.waiter_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Chefs Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Chefs
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.chef_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Captains Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Captains
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.captain_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Managers
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.manager_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-3 mb-6 mt-6">
          <h2
            class="text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Manage Outlet Details
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {/* Waiters Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Menus
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.total_menu}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Chefs Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUtensils}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Categories
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.total_category}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Captains Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sections
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.section_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Managers Metric */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Orders
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.orders_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/15">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="h-6 w-6 text-brand-500 dark:text-brand-400"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tables
                  </p>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                    {outletData?.table_count}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOutlet;

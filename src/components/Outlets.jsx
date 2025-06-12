import React, { useState, useEffect } from "react";
import brand02 from "../assets/images/brand/brand-02.svg";
import brand07 from "../assets/images/brand/brand-07.svg";
import brand08 from "../assets/images/brand/brand-08.svg";
import brand10 from "../assets/images/brand/brand-10.svg";
import brand15 from "../assets/images/brand/brand-15.svg";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useAdmin } from "../hooks/useAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const transactionsData = [
  {
    id: 1,
    name: "Bought PYPL",
    image: brand08,
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "success",
  },
  {
    id: 2,
    name: "Bought AAPL",
    image: brand07,
    date: "Nov 22, 09:00 PM",
    price: "$2,567.88",
    category: "Technology",
    status: "pending",
  },
  {
    id: 3,
    name: "Sell KKST",
    image: brand15,
    date: "Oct 12, 03:54 PM",
    price: "$6,754.99",
    category: "Finance",
    status: "success",
  },
  {
    id: 4,
    name: "Bought FB",
    image: brand02,
    date: "Sep 09, 02:00 AM",
    price: "$1,445.41",
    category: "Social media",
    status: "success",
  },
  {
    id: 5,
    name: "Sell AMZN",
    image: brand10,
    date: "Feb 35, 08:00 PM",
    price: "$5,698.55",
    category: "E-commerce",
    status: "failed",
  },
];

const SearchIcon = () => (
  <svg
    className="fill-gray-500 dark:fill-gray-400"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
      fill="currentColor"
    />
  </svg>
);

const MoreIcon = () => (
  <svg
    className="fill-current"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
      fill="currentColor"
    />
  </svg>
);

const StatusBadge = ({ status }) => {
  const statusClasses = {
    success:
      "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
    pending:
      "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
    failed:
      "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
  };

  return (
    <p
      className={`${statusClasses[status]} text-theme-xs rounded-full px-2 py-0.5 font-medium`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </p>
  );
};

const TableRow = ({ outlet, handleViewOutlet, handleEditOutlet }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(outlet);
  console.log(handleViewOutlet);

  return (
    <tr>
      <td className="py-3 pr-5 whitespace-nowrap sm:pr-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-theme-sm block font-medium text-gray-700 dark:text-gray-400">
                {outlet.name}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap sm:px-6">
        <div className="flex items-center justify-center">
          <p className="text-theme-sm text-gray-700 dark:text-gray-400">
            {outlet.code}
          </p>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap sm:px-6">
        <div className="flex items-center justify-center">
          <p className="text-theme-sm text-gray-700 dark:text-gray-400">
            {outlet.mobile}
          </p>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap sm:px-6">
        <div className="flex items-center justify-center">
          <p className="text-theme-sm text-gray-700 dark:text-gray-400">
            {outlet.accountType.charAt(0).toUpperCase() + outlet.accountType.slice(1)}
          </p>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap sm:px-6">
        <div className="flex items-center justify-center">
          <p className={`text-theme-sm rounded-full px-2 py-0.5 font-medium ${
            outlet.isOpen === 1 
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          }`}>
            {outlet.isOpen === 1 ? 'Open' : 'Close'}
          </p>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap sm:px-6">
        <div className="flex items-center justify-center">
          <p className={`text-theme-sm rounded-full px-2 py-0.5 font-medium ${
            outlet.outletStatus === 1 
              ? 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500'
              : 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
          }`}>
            {outlet.outletStatus === 1 ? 'Active' : 'Inactive'}
          </p>
        </div>
      </td>
      <td className="px-5 py-3 whitespace-nowrap sm:px-6">
        <div className="flex items-center justify-center gap-2">
          {/* View Button - Blue */}
          <button 
            className="w-8 h-8 flex items-center justify-center text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-theme-xs transition"
            title="View Details"
            onClick={() => handleViewOutlet(outlet.id)}
          >
            <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
          </button>

          {/* Edit Button - Yellow/Warning */}
          <button 
            className="w-8 h-8 flex items-center justify-center text-white bg-warning-500 hover:bg-warning-600 rounded-lg shadow-theme-xs transition"
            title="Edit Outlet"
            onClick={() => handleEditOutlet(outlet.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
          </button>

          {/* Delete Button - Red */}
          <button 
            className="w-8 h-8 flex items-center justify-center text-white bg-error-500 hover:bg-error-600 rounded-lg shadow-theme-xs transition"
            title="Delete Outlet"
          >
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-theme-sm shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:px-3.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Previous</span>
        </button>

        <span className="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>

        <ul className="hidden items-center gap-0.5 sm:flex">
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page !== "...") onPageChange(page);
                }}
                className={`text-theme-sm ${
                  page === currentPage
                    ? "bg-brand-500/[0.08] text-brand-500"
                    : "text-gray-700 dark:text-gray-400 hover:bg-brand-500/[0.08] hover:text-brand-500"
                } flex h-10 w-10 items-center justify-center rounded-lg font-medium dark:hover:text-brand-500 ${
                  page === "..." ? "cursor-default" : "cursor-pointer"
                }`}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-theme-sm shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 sm:px-3.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Next</span>
        </button>
      </div>
    </div>
  );
};

function Outlets() {
  const { getToken } = useAuth();
  const { adminData } = useAdmin();
  const [outletData, setOutletData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Transform outlet data to match UI structure
  const transformOutletData = (outlets) => {
    return outlets.map((outlet) => ({
      id: outlet.outlet_id,
      name: outlet.outlet_name,
      code: outlet.outlet_code,
      mobile: outlet.mobile,
      status: getOutletStatus(outlet.outlet_status, outlet.is_open),
      isOpen: outlet.is_open,
      outletStatus: outlet.outlet_status,
      image: brand02,
      accountType: outlet.account_type,
    }));
  };

  // Helper function to determine status
  const getOutletStatus = (outlet_status, is_open) => {
    if (outlet_status === 1 && is_open === 1) return "success";
    if (outlet_status === 1 && is_open === 0) return "pending";
    return "failed";
  };

  // Fetch outlets from API
  const fetchOutlets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://men4u.xyz/v2/common/listview_outlet",
        {
            user_id: adminData?.user_id,
        //   user_id: 2, //HARDCODE
          app_source: "admin_dashboard",
        },
        {
          headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.detail === "Successfully retrieved outlets") {
        const transformedData = transformOutletData(response.data.data);
        setOutletData(transformedData);
        setFilteredData(transformedData); // Initialize filtered data with all outlets
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch outlets");
      console.error("Error fetching outlets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Call API when component mounts
  useEffect(() => {
    if (adminData?.user_id) {
      fetchOutlets();
    }
  }, [adminData?.user_id]);

  // Handle search
  useEffect(() => {
    if (!outletData.length) return;

    const filtered = outletData.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchQuery, outletData]);

  // Get current items
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update table headers
  const tableHeaders = [
    { label: "Outlet Name", key: "name" },
    { label: "Outlet Code", key: "code" },
    { label: "Mobile", key: "mobile" },
    { label: "Account Type", key: "accountType" },
    { label: "Open/Close", key: "isOpen" },
    { label: "Status", key: "outletStatus" },
    { label: "Actions", key: "actions" },
  ];

  // Add this function to handle view button click
  const handleViewOutlet = (outletId) => {
    navigate(`/view-outlet/${outletId}`);
  };

  const handleEditOutlet = (outlet_id) => {
    navigate(`/edit-outlet/${outlet_id}`);
  };

  return (
    <div className="border-t border-gray-100 p-5 sm:p-6 dark:border-gray-800">
      <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4 flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Outlet Management
            </h3>
          </div>

          
          <button
            onClick={() => navigate('/create-outlet')}
            className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            <svg
              class="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.77692 3.24224C9.91768 3.17186 10.0834 3.17186 10.2241 3.24224L15.3713 5.81573L10.3359 8.33331C10.1248 8.43888 9.87626 8.43888 9.66512 8.33331L4.6298 5.81573L9.77692 3.24224ZM3.70264 7.0292V13.4124C3.70264 13.6018 3.80964 13.775 3.97903 13.8597L9.25016 16.4952L9.25016 9.7837C9.16327 9.75296 9.07782 9.71671 8.99432 9.67496L3.70264 7.0292ZM10.7502 16.4955V9.78396C10.8373 9.75316 10.923 9.71683 11.0067 9.67496L16.2984 7.0292V13.4124C16.2984 13.6018 16.1914 13.775 16.022 13.8597L10.7502 16.4955ZM9.41463 17.4831L9.10612 18.1002C9.66916 18.3817 10.3319 18.3817 10.8949 18.1002L16.6928 15.2013C17.3704 14.8625 17.7984 14.17 17.7984 13.4124V6.58831C17.7984 5.83076 17.3704 5.13823 16.6928 4.79945L10.8949 1.90059C10.3319 1.61908 9.66916 1.61907 9.10612 1.90059L9.44152 2.57141L9.10612 1.90059L3.30823 4.79945C2.63065 5.13823 2.20264 5.83076 2.20264 6.58831V13.4124C2.20264 14.17 2.63065 14.8625 3.30823 15.2013L9.10612 18.1002L9.41463 17.4831Z"
                fill=""
              ></path>
            </svg>
            Add Outlet
          </button>
        </div>
        <div className="mb-4 flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-[42px] w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                />
              </div>
            </form>
          </div></div>

        <div className="custom-scrollbar max-w-full overflow-x-auto overflow-y-visible px-5 sm:px-6">
          <table className="min-w-full">
            <thead className="border-y border-gray-100 py-3 dark:border-gray-800">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.key}
                    className="py-3 pr-5 font-normal whitespace-nowrap sm:pr-6"
                  >
                    <div className="flex items-center justify-center">
                      <p className="text-theme-sm text-gray-500 dark:text-gray-400">
                        {header.label}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {getCurrentItems().map((outlet) => (
                <TableRow 
                  key={outlet.id} 
                  outlet={outlet} 
                  handleViewOutlet={handleViewOutlet}
                  handleEditOutlet={handleEditOutlet}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Outlets;

import React from 'react'

function Search() {
  return (
    <div><div className="container mx-auto flex-grow py-6">
    <div className="w-full">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="w-1/3 text-left">
              <button
                onclick="history.back()"
                className="text-sm rounded-full border border-gray-300 text-gray-700 px-3 py-1 hover:bg-gray-100"
              >
                <i className="bx bxs-chevron-left-circle mr-2" />
                Back
              </button>
            </div>
            <div className="w-1/3 text-center">
              <h4 className="text-lg font-semibold mb-0">Search</h4>
            </div>
            <div className="w-1/3" /> {/* Empty to balance the flex layout */}
          </div>
          {/* Search Form */}
          <form method="GET" action="/1.3/search/" className="mb-4">
            <div className="flex justify-center gap-2 flex-wrap">
              <div className="w-64">
                <input
                  type="text"
                  name="q"
                  placeholder="Search by name or mobile number..."
                  required=""
                  className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-36">
                <select
                  name="role"
                  className="w-full h-[45px] px-3 py-2 border border-gray-300 rounded-md font-light focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Roles</option>
                  <option value="owner">Owner</option>
                  <option value="customer">Customer</option>
                  <option value="captain">Captain</option>
                  <option value="waiter">Waiter</option>
                  <option value="partner">Partner</option>
                  <option value="manager">Manager</option>
                  <option value="chef">Chef</option>
                </select>
              </div>
              <button
                type="submit"
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <i className="bx bx-search" /> Search
              </button>
            </div>
          </form>
          {/* Results */}
          {/* Add your results here */}
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Search
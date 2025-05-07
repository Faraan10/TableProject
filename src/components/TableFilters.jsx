import React from "react";
import Select from "react-select";

const TableFilters = ({
  data,
  search,
  setSearch,
  selectedSkills,
  setSelectedSkills,
  dateRange,
  setDateRange,
}) => {
  const allSkills = Array.from(
    new Set(data.flatMap((client) => client.details.skills))
  ).map((skill) => ({
    label: skill,
    value: skill,
  }));

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
      {/* Search Box*/}
      <div className="form-control w-full lg:w-1/3">
        <label className="label">
          <span className="label-text">Search by Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Skills filter */}
      <div className="form-control w-full lg:w-1/5">
        <label className="label">
          <span className="label-text">Filter by Skills</span>
        </label>
        <Select
          options={allSkills}
          value={selectedSkills}
          onChange={setSelectedSkills}
          isMulti
          className="text-black"
          classNamePrefix="react-select"
        />
      </div>

      {/* Date range filter */}
      <div className="form-control w-full lg:w-1/3">
        <label className="label">
          <span className="label-text">Filter by Joined Date</span>
        </label>
        <div className="flex flex-col lg:flex-row gap-2">
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateRange.startDate || ""}
            onChange={(e) =>
              setDateRange((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={dateRange.endDate || ""}
            onChange={(e) =>
              setDateRange((prev) => ({
                ...prev,
                endDate: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;

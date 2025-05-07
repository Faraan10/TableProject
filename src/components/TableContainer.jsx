import React, { useState } from "react";
import TableFilters from "./TableFilters";
import toast from "react-hot-toast";
import ExportButton from "./ExportButton";

const ClientTable = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  const [editrow, setEditRow] = useState({
    name: "",
    role: "",
    department: "",
  });
  const [editBasedId, setEditBasedId] = useState({
    rowId: null,
    field: null,
  });

  const clientsPerPage = 30;

  // Filtering data
  const filteredData = data.filter((client) => {
    const matchSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase());

    const matchSkills = selectedSkills.length
      ? selectedSkills.every((skill) =>
          client.details.skills.includes(skill.value)
        )
      : true;

    const joinedDate = new Date(client.joinedDate);
    const matchDate =
      (!dateRange.startDate || joinedDate >= new Date(dateRange.startDate)) &&
      (!dateRange.endDate || joinedDate <= new Date(dateRange.endDate));

    return matchSearch && matchSkills && matchDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / clientsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  // console.log(rowId);

  return (
    <div className="p-6">
      <div className="flex justify-end my-4">
        <ExportButton data={filteredData} filename="clients.csv" />
      </div>

      <TableFilters
        data={data}
        search={search}
        setSearch={setSearch}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="container mx-auto mt-20">
        <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((client) => (
                <React.Fragment key={client.id}>
                  <tr className="cursor-pointer hover:bg-base-300 transition-colors">
                    <td>{client.id}</td>
                    <td>
                      {editBasedId.rowId === client.id ? (
                        <input
                          type="text"
                          className="input input-info input-sm w-full"
                          value={editrow.name}
                          onChange={(e) =>
                            setEditRow((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        client.name
                      )}
                    </td>
                    <td>
                      {editBasedId.rowId === client.id ? (
                        <input
                          type="text"
                          className="input input-info input-sm w-full"
                          value={editrow.role}
                          onChange={(e) =>
                            setEditRow((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        client.role
                      )}
                    </td>
                    <td>
                      {editBasedId.rowId === client.id ? (
                        <input
                          type="text"
                          className="input input-info input-sm w-full"
                          value={editrow.department}
                          onChange={(e) =>
                            setEditRow((prev) => ({
                              ...prev,
                              department: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        client.department
                      )}
                    </td>
                    <td>{client.joinedDate}</td>
                    <td>
                      {editBasedId.rowId === client.id ? (
                        <div className="flex flex-col lg:flex-row gap-2">
                          <button
                            className="btn btn-soft btn-success"
                            onClick={() => {
                              const { name, role, department } = editrow;
                              if (
                                !name.trim() ||
                                !role.trim() ||
                                !department.trim()
                              ) {
                                toast.error("All fields are required!");
                                return;
                              }

                              setData((prevData) =>
                                prevData.map((clientItem) =>
                                  clientItem.id === editBasedId.rowId
                                    ? { ...clientItem, ...editrow }
                                    : clientItem
                                )
                              );

                              toast.success(`Saved changes for ${name}`);
                              setEditBasedId({ rowId: null, field: null });
                              setEditRow({
                                name: "",
                                role: "",
                                department: "",
                              });
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-soft btn-error"
                            onClick={() => {
                              setEditBasedId({ rowId: null, field: null });
                              setEditRow({
                                name: "",
                                role: "",
                                department: "",
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col lg:flex-row gap-2">
                          <button
                            className="btn btn-soft btn-accent"
                            onClick={() => {
                              toggleRow(client.id);
                            }}
                          >
                            More Info
                          </button>
                          <button
                            className="btn btn-soft btn-info"
                            onClick={() => {
                              setEditBasedId({
                                rowId: client.id,
                                field: "all",
                              });
                              setEditRow({
                                name: client.name,
                                role: client.role,
                                department: client.department,
                              });
                              setExpandedRow(null);
                              toast(`Editing ${client.name}'s record`);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                  {expandedRow === client.id && (
                    <tr className="bg-base-200">
                      <td colSpan="4" className="p-4">
                        <div className="p-4 bg-base-100 border border-base-300 rounded-lg shadow">
                          <h4 className="font-bold mb-2 text-base-content">
                            Details
                          </h4>
                          <p>
                            <strong>Manager:</strong> {client.details.manager}
                          </p>
                          <p>
                            <strong>Skills: </strong>
                            {client.details.skills.join(", ")}
                          </p>
                          <p>
                            <strong>Projects: </strong>
                            {client.details.projects.join(", ")}
                          </p>
                          <p>
                            <strong>Available for Projects:</strong>
                            {client.details.availableForNewProjects
                              ? " Yes"
                              : " No"}
                          </p>
                          <p>
                            <strong>Last Promotion Date: </strong>
                            {client.details.lastPromotionDate}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientTable;

// components/ExportCSVButton.jsx
import React from "react";
import toast from "react-hot-toast";

const ExportButton = ({ data, filename = "data.csv" }) => {
  const exportToCSV = () => {
    if (!data.length) {
      toast.error("No data to export!");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Email",
      "Role",
      "Department",
      "Joined Date",
      "Manager",
      "Skills",
      "Projects",
      "Available for Projects",
      "Last Promotion Date",
    ];

    const csvRows = [headers.join(",")];

    data.forEach((client) => {
      const row = [
        client.id,
        client.name,
        client.email,
        client.role,
        client.department,
        client.joinedDate,
        client.details.manager,
        client.details.skills.join(" | "),
        client.details.projects.join(" | "),
        client.details.availableForNewProjects ? "Yes" : "No",
        client.details.lastPromotionDate,
      ];
      csvRows.push(row.map((item) => `"${item}"`).join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-soft btn-success" onClick={exportToCSV}>
      Export to CSV
    </button>
  );
};

export default ExportButton;

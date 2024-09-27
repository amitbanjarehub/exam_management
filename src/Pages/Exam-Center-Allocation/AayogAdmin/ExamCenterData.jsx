import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamCenterData = () => {
  const [examCenters, setExamCenters] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [notAllocatedVerifiedCenters, setNotAllocatedVerifiedCenters] =
    useState([]);
  const [pendingCenters, setPendingCenters] = useState([]);

  // Function to fetch exam center data page by page
  const fetchAllExamCenters = async () => {
    let currentPage = 1;
    let totalPages = 1;
    let allExamCenters = [];

    while (currentPage <= totalPages) {
      try {
        // API request for each page
        const response = await axios.get(
          `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter`,
          {
            params: {
              page: currentPage,
            },
          }
        );

        const { examCenters: centers, totalPages: total } = response.data;
        allExamCenters = [...allExamCenters, ...centers]; // Collect all centers
        totalPages = total; // Update total pages
        currentPage++; // Move to next page
      } catch (error) {
        console.error("Error fetching exam center data:", error);
        break;
      }
    }

    setExamCenters(allExamCenters);
  };

  useEffect(() => {
    fetchAllExamCenters();
  }, []);

  useEffect(() => {
    if (examCenters.length > 0) {
      // Grouping by division
      const grouped = examCenters.reduce((acc, center) => {
        const {
          division,
          center_name,
          seating_capacity_min,
          seating_capacity_max,
          center_status,
          is_allocated,
        } = center;
        const capacity = `${seating_capacity_min} - ${seating_capacity_max}`;

        const centerData = {
          name: center_name,
          capacity,
          status: center_status,
          is_allocated,
        };

        const existingDivision = acc.find((item) => item.division === division);

        if (existingDivision) {
          existingDivision.centers.push(centerData);
        } else {
          acc.push({
            division,
            centers: [centerData],
          });
        }

        return acc;
      }, []);

      // Filter for centers where is_allocated === false and center_status === 'verified'
      const notAllocatedVerified = examCenters.reduce((acc, center) => {
        const {
          division,
          center_name,
          seating_capacity_min,
          seating_capacity_max,
          center_status,
          is_allocated,
        } = center;
        const capacity = `${seating_capacity_min} - ${seating_capacity_max}`;

        if (center_status === "verified" && !is_allocated) {
          const centerData = {
            name: center_name,
            capacity,
            status: center_status,
            is_allocated,
          };

          const existingDivision = acc.find(
            (item) => item.division === division
          );

          if (existingDivision) {
            existingDivision.centers.push(centerData);
          } else {
            acc.push({
              division,
              centers: [centerData],
            });
          }
        }

        return acc;
      }, []);

      // Filter for centers where center_status === 'pending'
      const pending = examCenters.reduce((acc, center) => {
        const {
          division,
          center_name,
          seating_capacity_min,
          seating_capacity_max,
          center_status,
        } = center;
        const capacity = `${seating_capacity_min} - ${seating_capacity_max}`;

        if (center_status === "Pending") {
          const centerData = {
            name: center_name,
            capacity,
            status: center_status,
          };

          const existingDivision = acc.find(
            (item) => item.division === division
          );

          if (existingDivision) {
            existingDivision.centers.push(centerData);
          } else {
            acc.push({
              division,
              centers: [centerData],
            });
          }
        }

        return acc;
      }, []);

      setGroupedData(grouped);
      setNotAllocatedVerifiedCenters(notAllocatedVerified);
      setPendingCenters(pending);
    }
  }, [examCenters]);
  console.log("pendingCenters:=========>>", pendingCenters);
  console.log(
    "notAllocatedVerifiedCenters:===========>>",
    notAllocatedVerifiedCenters
  );
  console.log("grouped:=========>>>", groupedData);

  return (
    <div>
      <h2>Grouped Exam Centers by Division</h2>
      {groupedData.map((group, index) => (
        <div key={index}>
          <h3>Division: {group.division}</h3>
          <ul>
            {group.centers.map((center, index) => (
              <li key={index}>
                Name: {center.name}, Capacity: {center.capacity}, Status:{" "}
                {center.status}, Is Allocated:{" "}
                {center.is_allocated ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Not Allocated & Verified Centers by Division</h2>
      {notAllocatedVerifiedCenters.map((group, index) => (
        <div key={index}>
          <h3>Division: {group.division}</h3>
          <ul>
            {group.centers.map((center, index) => (
              <li key={index}>
                Name: {center.name}, Capacity: {center.capacity}, Status:{" "}
                {center.status}, Is Allocated:{" "}
                {center.is_allocated ? "Yes" : "No"}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Pending Centers by Division</h2>
      {pendingCenters.map((group, index) => (
        <div key={index}>
          <h3>Division: {group.division}</h3>
          <ul>
            {group.centers.map((center, index) => (
              <li key={index}>
                Name: {center.name}, Capacity: {center.capacity}, Status:{" "}
                {center.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExamCenterData;



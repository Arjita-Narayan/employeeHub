import React, { useState, useEffect } from "react";
import axios from "axios";

const Count = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/employee/all");
        setCount(response.data.length);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchCount();
  }, []);

  return <span>Total Count: {count}</span>;
};

export default Count;

import React, { useEffect, useState } from "react";
import "../css/History.css";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem("goalHistory")) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div className="history_layout">
      <div className="history_page">
        <h2>Goal History</h2>
        {history.length === 0 ? (
          <p>No history available.</p>
        ) : (
          <div className="history_list">
            {history.map((entry, index) => (
              <div key={index} className="history_entry">
                <h3>{entry.date}</h3>
                <p>Progress: {entry.progress}%</p>
                <ul>
                  {entry.goals.map((goal, goalIndex) => (
                    <li
                      key={goalIndex}
                      style={{
                        textDecoration: goal.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {goal.text}{" "}
                      {goal.completed ? "(Completed)" : "(Not Completed)"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

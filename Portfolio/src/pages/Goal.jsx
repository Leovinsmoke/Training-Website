import React, { useState } from "react";
import "../css/Goal.css";

const Goal = () => {
  const [goals, setGoals] = useState([
    { id: 1, text: "10 Push Ups", completed: false },
    { id: 2, text: "20 Scissors Jump", completed: false },
    { id: 3, text: "30 mins coding", completed: false },
  ]);

  const handleToggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const handleSubmit = () => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const completedCount = goals.filter((goal) => goal.completed).length;
    const progress = (completedCount / goals.length) * 100;

    // Prepare data to save
    const historyEntry = {
      date: today,
      progress: Math.round(progress),
      goals: goals.map((goal) => ({
        text: goal.text,
        completed: goal.completed,
      })),
    };

    // Retrieve existing history from localStorage
    const existingHistory =
      JSON.parse(localStorage.getItem("goalHistory")) || [];

    // Check if there's already an entry for today
    const updatedHistory = existingHistory.filter(
      (entry) => entry.date !== today
    );

    // Add new entry
    updatedHistory.push(historyEntry);

    // Save to localStorage
    localStorage.setItem("goalHistory", JSON.stringify(updatedHistory));

    alert("Goals submitted successfully!");
  };

  const completedCount = goals.filter((goal) => goal.completed).length;
  const progress = (completedCount / goals.length) * 100;

  return (
    <div className="goal_layout">
      <div className="goal_page">
        <h2>Daily Goals</h2>
        <div className="progress_container">
          <div className="progress_bar">
            <div
              className="progress_fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}% Completed</p>
        </div>

        <div className="goals_list">
          {goals.map((goal) => (
            <div key={goal.id} className="goal_item">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => handleToggleGoal(goal.id)}
              />
              <span
                style={{
                  textDecoration: goal.completed ? "line-through" : "none",
                }}
              >
                {goal.text}
              </span>
            </div>
          ))}

          <button className="submit_button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Goal;

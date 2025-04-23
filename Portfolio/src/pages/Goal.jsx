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
        </div>
      </div>
    </div>
  );
};

export default Goal;

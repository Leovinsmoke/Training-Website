import { useEffect, useState } from "react";
import { createTasks, deleteTasks, loadTasks } from "../Context/GoalManage";
import "../css/Goal.css";

const Goal = () => {
  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Load tasks from API on mount and after add/delete
  const fetchTasks = async () => {
    try {
      const tasks = await loadTasks();
      setGoals(
        tasks.map((task) => ({
          id: task.id,
          text: task.Name,
          completed: task.Completed,
        }))
      );
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    const progress =
      goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

    const historyEntry = {
      date: today,
      progress: Math.round(progress),
      goals: goals.map((goal) => ({
        text: goal.text,
        completed: goal.completed,
      })),
    };

    const existingHistory =
      JSON.parse(localStorage.getItem("goalHistory")) || [];
    const updatedHistory = existingHistory.filter(
      (entry) => entry.date !== today
    );
    updatedHistory.push(historyEntry);
    localStorage.setItem("goalHistory", JSON.stringify(updatedHistory));

    alert("Goals submitted successfully!");
  };

  const handleAddGoal = async () => {
    if (newGoalText.trim()) {
      try {
        await createTasks(newGoalText);
        setNewGoalText("");
        setShowPopup(false);
        await fetchTasks(); // Refresh the goal list
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await deleteTasks(id);
      await fetchTasks(); // Refresh the goal list
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const completedCount = goals.filter((goal) => goal.completed).length;
  const progress = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

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
            <div
              key={goal.id}
              className="goal_item flex justify-between items-center"
            >
              <div>
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
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}

          <div className="add_goal">
            <button onClick={() => setShowPopup(true)} className="add-btn">
              +
            </button>
          </div>

          <button className="submit_button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className={`add_goal_popup ${showPopup ? "active" : ""}`}>
        <div className="popup-content">
          <button onClick={() => setShowPopup(false)} className="close-btn">
            ×
          </button>
          <h3>Add New Goal</h3>
          <input
            type="text"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="Enter new goal"
            className="popup-input"
          />
          <div className="button-group">
            <button onClick={handleAddGoal} className="add-submit-btn">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;

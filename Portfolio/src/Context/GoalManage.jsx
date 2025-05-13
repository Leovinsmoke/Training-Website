import axios from "axios";

const api_for_goal = "https://67c7faf7c19eb8753e7bae06.mockapi.io/api/huy/Work";

async function loadTasks() {
  try {
    const response = await axios.get(api_for_goal);
    return response.data;
  } catch (error) {
    console.error("Error loading tasks", error);
    throw error;
  }
}

async function createTasks(name) {
  try {
    const newTask = {
      Name: name,
      Completed: false,
    };
    const response = await axios.post(api_for_goal, newTask);
    return response.data; // Return the created task with the API-assigned id
  } catch (error) {
    console.error("Error creating tasks", error);
    throw error;
  }
}

async function deleteTasks(id) {
  try {
    await axios.delete(`${api_for_goal}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting tasks", error);
    throw error;
  }
}

export { createTasks, deleteTasks, loadTasks };

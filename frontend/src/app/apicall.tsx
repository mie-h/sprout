// apiCall.tsx

"use server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json(); // await the response to parse JSON
    console.log("List of users:", users);
    return users;
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }
}

export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const tasks = await response.json();
    return tasks;
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    throw new Error("Failed to fetch tasks");
  }
}

export async function sendMessage(message: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error sending message:", data.error);
      throw new Error("Failed to send message");
    }

    return data.response;
  } catch (error: any) {
    console.error("Error handling request:", error.message);
    throw new Error("Failed to process message");
  }
}

export async function logOut() {
  try {
    await fetch(`${API_BASE_URL}/api/logout`);
  } catch (error: any) {
    console.error("Error logging out:", error.message);
    throw new Error("Failed to log out");
  }
}

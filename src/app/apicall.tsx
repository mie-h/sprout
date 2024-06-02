"use server";

export async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = response.json();
    console.log("List of users:");
    console.log(users);
  } catch (error: any) {
    // What is the type of error?
    console.error("Error fetching users:", error.message);
  }
  return "retured from fetchUsers";
}

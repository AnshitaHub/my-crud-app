import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  console.log("fetch users invoke")
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data;
});

// Fetch a single user by ID
const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  const data = await response.json();
  return data;
});

// Create a new user
const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  console.log("create users invoke")
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  });
  const data = await response.json();
  console.log("data-->>",data)
  return data;
});

// Update a user
const updateUser = createAsyncThunk('users/updateUser', async ({ userId, updatedUser }) => {
  console.log("update users invoke")
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUser)
  });
  const data = await response.json();
  return data;
});

// Delete a user
const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`, {
    method: 'DELETE'
  });
  return userId;
});

export { fetchUsers, fetchUserById, createUser, updateUser, deleteUser };
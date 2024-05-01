import axios from "axios";
const url =
  "https://react-tasks-8980b-default-rtdb.firebaseio.com/expense-tracker";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${url}.json`, expenseData);

  const id = response.data.name;

  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${url}.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      date: new Date(response.data[key].date),
      amount: response.data[key].amount,
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(`${url}/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
    return axios.delete(`${url}/${id}.json`);
  };

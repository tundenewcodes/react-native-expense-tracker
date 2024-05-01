import React from "react";
import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpensesList = ({ expenses }) => {
  const renderExpenseItems = (itemData) => {
    return <ExpenseItem  {...itemData.item} />
  };

  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItems}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

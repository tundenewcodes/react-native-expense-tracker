import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  onSubmit,
  onCancel,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountisValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountisValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please check your Input");
      setInputs((curInputs) => ({
        amount: { value: curInputs.amount.value, isValid: amountisValid },
        date: { value: curInputs.date.value, isValid: dateIsValid },
        description: {
          value: curInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.text}>Your Expense</Text>
      <View style={styles.inputsContainer}>
        <Input
          style={styles.rowInput}
          label={"Amount"}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label={"Date"}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label={"Description"}
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
      {formIsInvalid && (
        <Text  style={styles.errorText}  >Invalid input values - please check your entered data</Text>
      )}
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginVertical: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

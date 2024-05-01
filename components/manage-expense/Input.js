import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, textInputConfig, style, invalid }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.multilineInput);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
});

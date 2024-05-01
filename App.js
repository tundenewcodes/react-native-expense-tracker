import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ManageExpenses from "./screens/ManageExpenses";

import { GlobalStyles } from "./constants/styles";

import ExpensesOverview from "./screens/BottomTabs";
import ExpensesContextProvider from "./store/expenses-context";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenses}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#24180f",
  },
  imgStyle: {
    opacity: 0.15,
    height: "100%",
  },
});

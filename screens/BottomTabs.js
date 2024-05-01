import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import RecentExpenses from "./RecentExpenses";
import AllExpenses from "./AllExpenses";
import IconButton from "../components/ui/IconButton";

const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton size={24} color={tintColor} icon={"add"}  onPress={()=>{
            navigation.navigate("ManageExpense")
          }} />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass" />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              color={color}
              size={size}
              name="home"
           
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default ExpensesOverview;

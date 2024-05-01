import { useContext, useEffect, useState } from "react";

import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import ExpensesOutput from "../components/expenses-output/ExpensesOutput";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getAllExpenses = async () => {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
       
      } catch (e) {
        setError(`could not fetch expenses : ${e.message}`);
      
      }
      setIsFetching(false);
    };

    getAllExpenses();
  }, []);

if (error && !isFetching) {
    return <ErrorOverlay message={error}  />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;


import { useContext } from "react"
// import ExpensesOutput from "../components/expenses-output/ExpensesOutput"
import { ExpensesContext } from "../store/expenses-context"
import ExpensesOutput from "../components/expenses-output/ExpensesOutput"

const AllExpenses = () => {
const expensesCtx = useContext(ExpensesContext)

    return (
       <ExpensesOutput expenses={expensesCtx.expenses}  expensePeriodName={"Total"} />
       )
}

export default AllExpenses
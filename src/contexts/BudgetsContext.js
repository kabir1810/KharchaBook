import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized';

export const useBudgets = () => {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {

    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    const getBudgetExpenses = (budgetID) => {
        return expenses.filter(expense => expense.budgetID === budgetID)
    }

    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }
    const addExpense = ({ description, amount, budgetID }) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetID }]
        })
    }
    const deleteBudget = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetID !== id) return expense;
                return { ...expense, budgetID: UNCATEGORIZED_BUDGET_ID }
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }
    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    }


    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense,
            getBudgetExpenses
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}
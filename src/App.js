import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import './App.css';
import AddBudget from './components/AddBudget';
import AddExpense from './components/AddExpense';
import BudgetCard from './components/BudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpense from './components/ViewExpense';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';

function App() {
    const [showAddBudget, setShowAddBudget] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
    const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState();
    const { budgets, getBudgetExpenses } = useBudgets();

    const openAddExpense = (budgetId) => {
        setShowAddExpense(true);
        setAddExpenseBudgetId(budgetId)
    }

    return (
        <>
            <Container className='my-4'>
                <Stack direction='horizontal' gap='2' className='mb-4'>
                    <h1 className='me-auto'>Budgets</h1>
                    <Button variant='primary' onClick={() => setShowAddBudget(true)}>Add Budget</Button>
                    <Button variant='outline-primary' onClick={openAddExpense}>Add Expense</Button>
                </Stack>
                <div className='grid'>
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpense(budget.id)}
                                onViewExpensesClick={() => setViewExpensesBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpense}
                        onViewExpensesClick={() => setViewExpensesBudgetId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudget show={showAddBudget} handleClose={() => setShowAddBudget(false)} />
            <AddExpense show={showAddExpense} handleClose={() => setShowAddExpense(false)} defaultBudgetId={addExpenseBudgetId} />
            <ViewExpense budgetId={viewExpensesBudgetId} handleClose={() => setViewExpensesBudgetId()} />
        </>
    );
}

export default App;

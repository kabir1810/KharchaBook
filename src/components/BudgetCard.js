import React from 'react'
import { currencyFormatter } from '../utils'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'

const getVariant = (amount, max) => {
    const ratio = amount / max;
    if (ratio < .5) return 'primary';
    if (ratio < .75) return 'warning';
    return 'danger';
}

const BudgetCard = ({ name, amount, max, gray, hideButtons, onAddExpenseClick, onViewExpensesClick }) => {

    const classNames = [];
    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
        classNames.push('bg-light')
    }

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between mb-3 align-items-baseline fw-normal'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>
                        {currencyFormatter.format(amount)}
                        {max && <span className='text-muted fs-6 ms-1'>/ {currencyFormatter.format(max)}</span>}
                    </div>
                </Card.Title>
                {max && <ProgressBar className='rounded-pill' variant={getVariant(amount, max)}
                    min={0} max={max} now={amount} />}
                {!hideButtons &&
                    <Stack direction='horizontal' gap='2' className='mt-4'>
                        <Button variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick}>Add Expense</Button>
                        <Button variant='outline-secondary' onClick={onViewExpensesClick} >View Expenses</Button>
                    </Stack>}
            </Card.Body>
        </Card>
    )
}

export default BudgetCard

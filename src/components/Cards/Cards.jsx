import React from 'react'
import {Card ,Row } from "antd"
import "./Cards.css"
import Button from "../Button/Button"

const Cards = ({showExpenseModal, showIncomeModal, income , expense , totalBalance}) => {
  return (
    <div>
        <Row className='my-row'>
            <Card className='my-card' >
              <h2>Current Balance</h2>
              <p>₹{totalBalance}</p>
              <Button text="Reset Balance" blue={true}/>
            </Card>
            <Card className='my-card' >
            <h2>Total Income</h2>
              <p>₹{income}</p>
              <Button text="Add Income" blue={true}
                onclick={showIncomeModal}
              />
            </Card>
            <Card className='my-card'>
            <h2>Total Expence</h2>
      <p>₹{expense}</p>
              <Button text="Add Expense" blue={true}
                onclick={showExpenseModal}
              />
            </Card>
            
        </Row>

    </div>
  )
}

export default Cards
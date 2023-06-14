"use client"

import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
 
export const NumPad = ({ inputAmount }) => {
  const [paymentAmount, setPaymentAmount] = useState("")

  const checkInput = (inputValue) => {
    const regex = /^(\d{0,25}(\.\d{0,4})?)$/
    const combinedInput = paymentAmount + inputValue
    console.log(combinedInput)
    if (regex.test(combinedInput) === true) {
      setPaymentAmount(combinedInput)
    }
  }

  return (
    <div>
      <Input 
        className="flex"
        label="Amount"
        value={paymentAmount}
        disabled
      />
      <div className="grid grid-cols-3 grid-rows-6 gap-2 p-2">
        <Button color="white" onClick={() => {
          setPaymentAmount("")
          inputAmount('')
        }} >Clear</Button>
        <Button disabled className="opacity-5">LOGO</Button>
        <Button className="col-end-4" color="white" onClick={() => setPaymentAmount(paymentAmount.slice(0, -1))}>Back</Button>
        <Button value={7} color="white" onClick={(e) => checkInput(e.target.value)}>7</Button>
        <Button value={8} color="white" onClick={(e) => checkInput(e.target.value)}>8</Button>
        <Button value={9} color="white" onClick={(e) => checkInput(e.target.value)}>9</Button>
        <Button value={4} color="white" onClick={(e) => checkInput(e.target.value)}>4</Button>
        <Button value={5} color="white" onClick={(e) => checkInput(e.target.value)}>5</Button>
        <Button value={6} color="white" onClick={(e) => checkInput(e.target.value)}>6</Button>
        <Button value={1} color="white" onClick={(e) => checkInput(e.target.value)}>1</Button>
        <Button value={2} color="white" onClick={(e) => checkInput(e.target.value)}>2</Button>
        <Button value={3} color="white" onClick={(e) => checkInput(e.target.value)}>3</Button>
        <Button value={`.`} color="white" 
          onClick={(e) => {
              if (paymentAmount === ""){
                setPaymentAmount("0" + paymentAmount + e.target.value)
              } else {
                checkInput(e.target.value)
              }
            }
          }
        >.</Button>
        <Button value={0} color="white" 
          onClick={(e) => {
            if (paymentAmount != "") {
              checkInput(e.target.value)
            }
          }}
        >0</Button>
        <Button color="white" onClick={() => inputAmount(paymentAmount)}>OK</Button>
      </div>
    </div>
  );
}
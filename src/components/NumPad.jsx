"use client"

import { Button, Input } from "@material-tailwind/react";
 
export const NumPad = () => {
  return (
    <div>
      <Input label="Amount" />
      <div className="grid grid-cols-3 grid-rows-5 gap-2">
        <Button color="white">Clear</Button>
        <Button color="white">Back</Button>
        <Button color="white">%</Button>
        <Button color="white">7</Button>
        <Button color="white">8</Button>
        <Button color="white">9</Button>
        <Button color="white">4</Button>
        <Button color="white">5</Button>
        <Button color="white">6</Button>
        <Button color="white">1</Button>
        <Button color="white">2</Button>
        <Button color="white">3</Button>
        <Button color="white" onClick={(e) => console.log(e.target)}>0</Button>
        <Button color="white">.</Button>
        <Button color="white">=</Button>
      </div>
    </div>
  );
}


// const Button = ({ colSpan = false, rowSpan = false, children }) => {
//   return (
//     <div
//       className={`${colSpan ? 'col-span-2' : ''} ${rowSpan ? 'row-span-2' : ''} bg-white p-3 rounded`}
//     >
//       <div className="flex items-center justify-center">{children}</div>
//     </div>
//   );
// };
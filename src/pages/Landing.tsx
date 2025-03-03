import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { Count, IncrementValues } from "../components/Count"
  
export const Landing: FC = () => {
    const [count, setCount] = useState<number>(0)
    const [increment, setIncrement] = useState<IncrementValues>(1)

    const handleCountChange = (newCount: number) => {
      setCount(newCount)
    }
  
    const handleIncrementChange = (increment: IncrementValues) => {
        setIncrement(increment)
    }

    return (
        <Stack>
            <Count count={count} handleCountChange={handleCountChange} handleIncrementChange={handleIncrementChange} increment={increment} />
        </Stack>
    );
}
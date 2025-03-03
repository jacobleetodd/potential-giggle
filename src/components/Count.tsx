import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Add, Remove } from "@mui/icons-material";

export type IncrementValues = 1 | 5 | 10 | 50 | 100;

const incrementValues: IncrementValues[] = [1, 5, 10, 50, 100];

export interface CountProps {
    count: number;
    handleCountChange: (newCount: number) => void;
    handleIncrementChange: (increment: IncrementValues) => void;
    increment: IncrementValues;
}
  
export const Count: FC<CountProps> = ({count, handleCountChange, handleIncrementChange, increment}) => {
    const onIncrementChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value;
        const valueNumber = typeof value === "number" ? value : parseInt(value);
        
        if (incrementValues.includes(valueNumber as IncrementValues)) {
            handleIncrementChange(valueNumber as IncrementValues);
        }
    };

    const onDecrement = () => {
        const newCount = count - increment;
        handleCountChange(newCount > 0 ? newCount : 0);
    }

    const onIncrement = () => {
        const newCount = count + increment;
        handleCountChange(newCount);
    }

    return (
        <Stack
            alignItems={"center"}
            border="solid 1px"
            borderColor="common.white"
            borderRadius={2}
            justifyContent={"center"}
            minWidth={400}
            p={2}
            spacing={2}
            sx={{ backgroundColor: "common.white" }}
        >
            <Typography aria-label="count" color="primary" variant="h1">
                {count}
            </Typography>
            <Stack direction="row" justifyContent="space-around" width="100%">
                <IconButton aria-label="decrement" color="primary" onClick={onDecrement}>
                    <Remove />
                </IconButton>
                <IconButton aria-label="increment" color="primary" onClick={onIncrement}>
                    <Add />
                </IconButton>
            </Stack>
            <FormControl fullWidth>
                <InputLabel id="increment-label">Increment</InputLabel>
                <Select label="Increment" labelId="increment-label" onChange={onIncrementChange} value={increment}>
                    {incrementValues.map((value) => (
                        <MenuItem key={value} value={value}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
}
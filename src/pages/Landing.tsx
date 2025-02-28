import { Button, Stack } from "@mui/material";
import { FC } from "react";

export interface LandingProps {

}
  
export const Landing: FC<LandingProps> = ({}) => (
    <Stack alignContent={"center"} justifyContent={"center"} p={8}>
        <Button variant="contained" color="primary">
            Hello World
        </Button>
    </Stack>
)
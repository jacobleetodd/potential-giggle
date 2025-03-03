import { FC } from 'react'
import { Landing } from './pages/Landing'
import { Stack } from '@mui/material'

const App: FC = () => (
  <Stack alignItems="center" height="100vh" justifyContent="center" width="100vw">
    <Landing />
  </Stack>
)

export default App

import * as React from 'react';
import { Game } from './components/Game';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const App: React.FC = () => {
  const [isBlack, setIsBlack] = React.useState(false);

  return (
    <>
      <Box sx={{ 
        '& > button': { m: 1 },
        backgroundColor: isBlack ? "black" : "white",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <FormControlLabel
          control={
            <Switch
              checked={isBlack}
              onChange={() => setIsBlack((isBlack) => !isBlack)}
              name="Change Theme"
              color="primary"
            />
          }
          label="Change Theme"
        />
        <Game isBlack={isBlack} />
      </Box>
    </>
  );
}

export default App;
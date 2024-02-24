import * as React from 'react';

import { Game } from './components/Game';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function App() {
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

        {/* 
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={RetroTheme}>
            <RetroButton />
          </ThemeProvider>
        </StyledEngineProvider>
        <BasicButton /> 
        <UseButton />
        <CardButton />

      */}
    </>
  );
}

export default App;


/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/

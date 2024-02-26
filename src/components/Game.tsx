import React, { useState, useRef } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery';
import sword from '../sword.gif';
import start from '../start.jpg';
import Box from '@mui/material/Box';
import RetroButton from './buttons/RetroButton';
import { StyledEngineProvider } from "@mui/material/styles";
import { RetroTheme } from '../themes/RetroTheme';

import CenteredImage from './CenteredImage';
import FightGame from './fightGame/FightGame';

import {
    Paper,
    ThemeProvider,
    // Typography,
} from "@mui/material";


const Game: React.FC<{ isBlack: boolean }> = ({ isBlack }) => {

    const [isCombat, setIsCombat] = useState<boolean>(false);
    const [combatLoading, setCombatLoading] = useState<boolean>(false);
    // const isMediumScreen = useMediaQuery('(max-width:1200px)');
    const timerRef = useRef(10);

    const setCombatTime = () => {

        setCombatLoading(true)
        setTimeout(() => {
            setCombatLoading(false);
            setIsCombat(true);
        }, timerRef.current * 300 );

        setTimeout(() => {
            setIsCombat(false);
        }, timerRef.current * 1400 );
    }

    return(
        <>
            <Box>                
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={RetroTheme}>
                        {
                        <Paper sx={{width: "1048px", minHeight: "576px"}}>
                            {
                                isCombat
                                ? <FightGame timerRef={timerRef} setIsCombat={setIsCombat} />
                                : <CenteredImage sword={ combatLoading ? sword : start } />
                            }
                            {/* <Typography 
                                variant={isMediumScreen ? "h4" : "h3"}
                                sx={[
                                    isBlack && {
                                        color: "red",
                                    },
                                    {
                                        textAlign: "center",
                                    }
                                ]} 
                            >
                                Lorem ipsum
                            </Typography> */}
                        </Paper>
                        }
                        
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                // height: "100vh",
                                margin: 0,
                            }}
                        >
                            <RetroButton 
                                setCombatTime={setCombatTime} 
                                isCombat={isCombat || combatLoading}
                            />
                        </Box>
                    </ThemeProvider>
                </StyledEngineProvider>
            </Box>
        </>
    );
}

export { Game };

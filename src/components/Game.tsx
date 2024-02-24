import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import sword from '../sword.gif';
import Box from '@mui/material/Box';
import RetroButton from './buttons/RetroButton';
import { StyledEngineProvider } from "@mui/material/styles";
import { RetroTheme } from '../themes/RetroTheme';

import {
    Paper,
    ThemeProvider,
    Typography,
} from "@mui/material";


const Game: React.FC<{ isBlack: boolean }> = ({ isBlack }) => {

    const [isCombat, setIsCombat] = useState<boolean>(false);
    const isMediumScreen = useMediaQuery('(max-width:1200px)');

    const setCombatTime = () => {
        setIsCombat(true)

        setTimeout(() => {
            setIsCombat(false);
        }, 5000);
    }

    return(
        <>
            <Box>                
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={RetroTheme}>
                        <Paper sx={{width: "350px"}}>
                            <img
                                src={ isCombat ? sword : '' }
                                alt=""
                                style={{ 
                                    height: 'auto', 
                                    maxHeight: '320px', 
                                    minHeight: '320px' 
                                }}
                            />
                            <Typography 
                                variant={isMediumScreen ? "h4" : "h3"}
                                sx={[
                                    isBlack && {
                                        color: "red",
                                    },
                                    // anotherCondition && {
                                    //     color: "red",
                                    // }
                                ]} 
                            >
                                Lorem ipsum
                            </Typography>
                        </Paper>

                        <RetroButton 
                            setCombatTime={setCombatTime} 
                            isCombat={isCombat}
                        />
                    </ThemeProvider>
                </StyledEngineProvider>
            </Box>
        </>
    );
}

export { Game };

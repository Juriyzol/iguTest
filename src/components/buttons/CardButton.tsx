import React, { useState, useEffect } from 'react';

import logo from '../../logo.svg';
import sword from '../../sword.gif';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';

import {
    Button,
    Paper,
    ThemeProvider,
    Typography,
    createTheme
} from "@mui/material";
import { deepOrange, yellow } from "@mui/material/colors";

import Icon from "@mui/material/Icon";



const CardButton = () => {
    const theme = createTheme({
        palette: {
            primary: deepOrange,
            // secondary: yellow,
            secondary: {
                main: yellow[700],
                dark: yellow[900],
                contrastText: yellow[50],
            }
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        padding: "14px",
                        borderRadius: "12px",
                    }
                }
            },
            MuiButton: {
                defaultProps: {
                    disableRipple: true,
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        width: "50%",
                        color: "white",
                        // backgroundColor: deepOrange[800],
                        borderRadius: "8px",
                        // "&:hover": {
                        //     backgroundColor: deepOrange[600],
                        // }
                    }
                }
            }
        }
    });


    const [isCombat, setIsCombat] = useState<any>(false);


    const setCombatTime = () => {
        setIsCombat(true)

        setTimeout(() => {
            setIsCombat(false);
        }, 5000);
    }


    return(
        <>
            <Box
                sx={{
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // height: '100vh',
                }}
            >
                <Paper sx={{width: "350px"}}>
                    <ThemeProvider theme={theme}>
                        <img
                            src={ isCombat ? sword : logo }
                            alt="Описание картинки"
                            style={{ 
                                // minWidth: '300px', 
                                height: 'auto', 
                                maxHeight: '200px', 
                                minHeight: '200px' 
                            }}
                        />
                        <Typography variant="h5" sx={{my: 1}} >
                            Lorem ipsum
                        </Typography>
                        {/* <Button
                            size="small"
                            sx={{ mt: 2, ml: 2 }}
                            variant="bold"
                            href="#"
                        >
                            Custom Variant
                        </Button>
                        <Button variant="contained" color="secondary" onClick={setCombatTime} >
                            yellow submarine
                        </Button> */}

                        <LoadingButton
                            variant="contained" color="secondary"
                            onClick={setCombatTime}
                            loading={isCombat}
                            loadingIndicator="Figniting..."
                        >
                            Start Combat
                        </LoadingButton>

                        <Button
                            //component="span"
                            //disabled={false}
                            //fullWidth={false}
                            size="medium"
                            startIcon={<Icon>star</Icon>}
                            sx={{ mt: 2, ml: 2 }}
                            variant="bold"
                            href="#"
                            >
                            Custom Variant
                        </Button>
                        {/* <Button 
                            variant="contained"
                            sx={{
                                border: "3px solid",
                                borderColor: "secondary.main",
                                py: 2
                            }}
                        >
                            submarine
                        </Button> */}
                    </ThemeProvider>
                    {/* <Button variant="contained" color="secondary">
                        Custom
                    </Button> */}
                </Paper>
            </Box>
        </>
    );
}

export { CardButton };

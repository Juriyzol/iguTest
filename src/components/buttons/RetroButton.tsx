import React from 'react';

import Icon from "@mui/material/Icon";
import LoadingButton from '@mui/lab/LoadingButton';


interface RetroButtonProps {
  setCombatTime: () => void;
  isCombat: boolean;
}

const RetroButton: React.FC<RetroButtonProps> = ({ setCombatTime, isCombat }) => {
  return (
    <LoadingButton
      variant="bold"
      onClick={setCombatTime}
      loading={isCombat}
      loadingIndicator="Figniting..."
      size="medium"
      startIcon={<Icon>star</Icon>}
      sx={{
        textAlign: "center",
        mt: 2,
        ml: 2,
      }}
    >
      Start Combat
    </LoadingButton>
  );
}

export default RetroButton;
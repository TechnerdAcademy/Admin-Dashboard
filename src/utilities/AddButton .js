import React from "react";
import { Avatar, ButtonBase, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

const AddButton = ({ onClick }) => {
  const theme = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: theme.palette.success.dark }}>
      <ButtonBase
        size="small"
        sx={{ borderRadius: "12px", marginBottom: "2px" }} // Adjust margin-bottom to push text down
        onClick={onClick} // Attach onClick handler
      >
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: "all .2s ease-in-out",
            background: theme.palette.success.light,
            color: theme.palette.success.dark,
            '&[aria-controls="menu-list-grow"], &:hover': {
              background: theme.palette.success.dark,
              color: theme.palette.success.light,
            },
          }}
        >
          <AddIcon stroke={1.5} size="small" />
        </Avatar>
      </ButtonBase>
      {/* Adjusted Typography to be aligned to the bottom */}
      <Typography variant="body1" sx={{ color: theme.palette.success.dark }}>
        Add
      </Typography>
    </div>
  );
};

export default AddButton;

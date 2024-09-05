import { Avatar, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const AddButton = () => {
  const theme = useTheme();

  return (
    <div style={{ display: "grid", color: theme.palette.warning.dark }}>
      <ButtonBase size="small" sx={{ borderRadius: "12px" }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: "all .2s ease-in-out",
            background: theme.palette.warning.light,
            color: theme.palette.warning.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.warning.dark,
              color: theme.palette.warning.light,
            },
          }}
        >
          <RestartAltIcon stroke={1.5} size="small" />
        </Avatar>
      </ButtonBase>{" "}
      Reset
    </div>
  );
};

export default AddButton;

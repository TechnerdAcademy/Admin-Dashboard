import { Avatar, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const AddButton = () => {
  const theme = useTheme();

  return (
    <div style={{ display: "grid", color: theme.palette.error.dark }}>
      <ButtonBase size="small" sx={{ borderRadius: "12px" }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: "all .2s ease-in-out",
            background: theme.palette.error.light,
            color: theme.palette.error.dark,
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: theme.palette.error.dark,
              color: theme.palette.error.light,
            },
          }}
        >
          <CloseIcon stroke={1.5} size="small" />
        </Avatar>
      </ButtonBase>
      Cancel
    </div>
  );
};

export default AddButton;

// import { ButtonBase, Avatar } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";
// import { useTheme } from "@mui/material/styles";

// const AddButton = () => {
//   const theme = useTheme();

//   return (
//     <div style={{ display: "grid", color: theme.palette.primary.dark }}>
//       <ButtonBase size="small" sx={{ borderRadius: "12px" }}>
//         <Avatar
//           variant="rounded"
//           sx={{
//             ...theme.typography.commonAvatar,
//             ...theme.typography.mediumAvatar,
//             transition: "all .2s ease-in-out",
//             background: theme.palette.primary.light,
//             color: theme.palette.primary.dark,
//             '&[aria-controls="menu-list-grow"],&:hover': {
//               background: theme.palette.primary.dark,
//               color: theme.palette.primary.light,
//             },
//           }}
//         >
//           <CheckIcon stroke={1.5} size="small" />
//         </Avatar>
//       </ButtonBase>
//       Update{" "}
//     </div>
//   );
// };

// export default AddButton;

import React from "react";
import { Avatar, ButtonBase, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
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
          <CheckIcon stroke={1.5} size="small" />
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


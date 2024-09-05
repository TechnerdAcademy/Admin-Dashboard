import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs({ back, arr }) {
  // CustomizedBreadcrumbs.defaultProps = {
  //     back: true
  // }

  const navigate = useNavigate();

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {/* {back ? */}
        <StyledBreadcrumb
          size="small"
          onClick={() => navigate(-1)}
          icon={<ArrowBackIcon fontSize="small" />}
        />
        {/* : <p></p>} */}

        <Link to={`/`}>
          <StyledBreadcrumb
            size="small"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
        </Link>

        {arr.map((arr) => {
          return (
            <Link to={arr.url}>
              <StyledBreadcrumb size="small" label={arr.title} />
            </Link>
          );
        })}

        {/* <StyledBreadcrumb label={a} />
                <StyledBreadcrumb label={b} /> */}

        {/* {arr.map(student => `<StyledBreadcrumb label=${student}" />`)} */}

        {/* {arr.map(student => `${student} `)} */}
      </Breadcrumbs>
    </div>
  );
}

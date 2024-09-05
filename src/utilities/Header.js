// ui-helper/Header.js

import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Box } from '@mui/material';
import BreadCrumb from './BreadCrumb';

const Header = ({ title, breadcrumbItems, titleMarginRight }) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '10px 20px', // Reduced padding
        display: 'flex',
        backgroundColor: 'rgb(236, 242, 255)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px', // Reduced height
        marginBottom: '10px', // Adjusted bottom margin if needed
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h4" // Adjusted font size
          style={{ marginBottom: '5px', marginRight: titleMarginRight }}
        >
          {title}
        </Typography>
        <BreadCrumb
          back={false}
          arr={breadcrumbItems}
          style={{ fontSize: '0.75rem', backgroundColor: 'transparent' }} // Adjusted font size
        />
      </Box>
      <a
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
      </a>
    </Paper>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  titleMarginRight: PropTypes.string,
};

Header.defaultProps = {
  titleMarginRight: '0px',
};

export default Header;

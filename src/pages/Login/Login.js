import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import main_axios from '../../utilities/mainaxios';
import { toast } from 'react-toastify'; // Import toast for notifications

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Name state for signup
  const [mobile, setMobile] = useState(''); // Mobile state for signup
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(''); // State for email error message
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        return;
      }

      setEmailError('');

      const { data } = await main_axios.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('lastRefreshTime', Date.now());
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.tokens.access.token);
      localStorage.setItem('clientId', data.user.mobile);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('roleName', data.user.roleName);
      localStorage.setItem('roleId', data.user.role_id);
      localStorage.setItem('rToken', data.tokens.refresh.token);

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
      toast.error('Login failed. Please check your credentials.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        return;
      }

      setEmailError('');

      // Send name, email, password, mobile, and role_id to the signup API
      const { data } = await main_axios.post('/auth/register', {
        name,
        email,
        password,
        mobile,
        role_id: '0', // Replace this with the appropriate role ID
      });

      toast.success('Signup successful!');
      navigate('/'); // Navigate to the homepage after successful signup
    } catch (error) {
      console.error('Signup error', error);
      toast.error('Signup failed. Please try again.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container
        sx={{
          width: '400px',
          maxWidth: '100%',
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
      <Box sx={{ marginBottom: 2 }}>
  <img
    src={`${process.env.PUBLIC_URL}/tecknerdslogo.png`}
    alt="Technerds Logo"
    style={{
      width: 200, // adjust the width to your desired size
      height: 120, // adjust the height to your desired size
      objectFit: 'cover', // crop the image to fit the container
      objectPosition: 'center', // focus on the center of the image
    }}
  />
</Box>

        {isLogin ? (
          // Login Form
          <>
            <Typography variant="h5" sx={{ marginBottom: 2, color: '#4A148C' }}>
              Welcome to Technerds Academy
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 3, color: '#555' }}>
              Enter your credentials to continue
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <Typography variant="body2" sx={{ color: 'red', marginBottom: 2 }}>
                  Invalid email or password
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#6A1B9A',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#4A148C',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <Button
              fullWidth
              variant="outlined"
              sx={{ marginTop: 2, borderColor: '#4A148C', color: '#4A148C' }}
              onClick={() => setIsLogin(false)} // Switch to signup form
            >
              Create Account
            </Button>
          </>
        ) : (
          // Signup Form
          <>
            <Typography variant="h5" sx={{ marginBottom: 2, color: '#4A148C' }}>
              Create a New Account
            </Typography>
            <form noValidate autoComplete="off" onSubmit={handleSignup}>
              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mobile Number"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#6A1B9A',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#4A148C',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>

            <Button
              fullWidth
              variant="outlined"
              sx={{ marginTop: 2, borderColor: '#4A148C', color: '#4A148C' }}
              onClick={() => setIsLogin(true)} // Switch to login form
            >
              Back to Login
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
}

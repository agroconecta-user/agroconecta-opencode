import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthAdmin } from '../api/admin';

const AdminPage= () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: '',
    adminPwd: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormData({ adminName: '', adminPwd: '' });
    AuthAdmin({ name: formData.adminName, password: formData.adminPwd });

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          display: 'flex',
          justifyContent: 'flex-end',          
        }}
      >
        { localStorage.getItem('token') && (
          <Button
            onClick={handleLogout}
            sx={{ 
              mb: 4,
              fontSize: '1rem',
              fontWeight: 'bold', 
              color: 'error.main', 
              border: '2px solid', 
              borderColor: 'error.main',
              '&:hover': { 
                backgroundColor: 'error.light', 
                color: 'white',
                borderColor: 'error.dark'
              }
            }}
          >
            Signout
          </Button>
        )}
      </Box>
      <Box
        sx={{
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          maxWidth: 450,
          width: '100%',
          mx: 'auto',
          background: 'linear-gradient(135deg, rgba(0, 99, 212, 0.1), rgba(0, 255, 174, 0.1))'
        }}
      >
        <Typography variant="h4" fontWeight={600} color='#0d8861' gutterBottom sx={{ textAlign: 'center' }}>
          Admin Login
        </Typography>

        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            label="Admin"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="adminPwd"
            type="password"
            value={formData.adminPwd}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              type="submit"
              sx={{
                bgcolor: '#0d8861ff',
                color: 'white',
                px: 4,
                py: 1,
                borderRadius: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(13, 136, 97, 0.8)' }
              }}
            >
              Signin
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;
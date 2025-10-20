import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import agroconectaIcon from '../utils/agroconecta-icon.svg';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const ADMIN_MODE = import.meta.env.VITE_ADMIN_MODE === 'true';
  const adminToken = localStorage.getItem('token') || '';

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#00000000'
      }}
    >
      <Box 
        sx={{ 
          textAlign: 'center', 
          p: { xs: 0, md: 6 }, 
          bgcolor: 'background.paper', 
          borderRadius: 4, 
          maxWidth: 600,
          background: 'rgba(255, 255, 255, 0)',
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
          tabIndex={0}
        >
          <Box
            component="img"
            src={agroconectaIcon}
            alt="Logo"
            sx={{ height: 100 }}
          />
        </Box>
        <Typography variant="h4" fontWeight={600} color='#0d8861ff' gutterBottom>
          Banco de Soluções do AgroConecta
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
          Encontre soluções inovadoras para o agronegócio.
        </Typography>
        

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 6, mb: 6 }}>
          <Button
            sx={{
              bgcolor: '#0d8861ff', 
              color: 'white', 
              p: 3, py: 1.2,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { bgcolor: 'rgba(13, 136, 97, 0.6)' }
            }} 
            onClick={() => navigate('/solutions')}
          >
            Ver Soluções
          </Button>

          {(ADMIN_MODE || adminToken) && (
            <Button
              sx={{
                bgcolor: '#0d8861ff', 
                color: 'white', 
                px: 3, 
                py: 1.2,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(13, 136, 97, 0.6)' }
              }} 
              onClick={() => navigate('/storage-solution')}
            >
              Adicionar Solução
            </Button>
          )}
        </Box>
        <Typography variant="h6" color="textDisabled" sx={{ m: 0  }}>
          Caso não encontre o que procura, entre em contato conosco.
        </Typography>
        <Typography variant="h6" color="textDisabled" sx={{ m: 0 }}>
          agroconecta...@gmail.com | +55 88 9 9439-****
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardPage;

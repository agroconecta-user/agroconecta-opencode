import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Link, Button, CircularProgress } from '@mui/material';
import { getSolution, deleteSolution } from '../api/solution';
import { CATEGORIES_CONFIG, CategoryType, getSubcategoryLabel } from '../utils/categories';
import { SolutionFromBackend } from '../types/solution';
import TouchAppIcon from '@mui/icons-material/TouchApp';

export const SolutionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<SolutionFromBackend | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const adminToken = localStorage.getItem('token') || '';
  const ADMIN_MODE = import.meta.env.VITE_ADMIN_MODE === 'true';


  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchSolution = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSolution(id);
        setSolution(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da solução:', error);
        setError('Erro ao carregar os detalhes da solução. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [id]);

  const formateDate = (dateString: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    const [ano, mes, dia] = dateString.split('-');
    return `${dia}/${mes}/${ano}`;
  }


  const handleDelete = async () => {
    if (!id) {
      return;
    }
    try {
      await deleteSolution(id, adminToken);
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao excluir solução:', error);
      setError('Erro ao excluir a solução, talvez seu token seja inválido.');
    }
  };

  if (!id) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="body1" align="center">ID da solução não fornecido.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(13, 136, 97, 0.1))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress variant="indeterminate" size={24} />
          <Typography variant="h4" align="center">Carregando detalhes da solução...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(184, 86, 0, 0.1), rgba(205, 25, 25, 0.1))'
          }}
        >
          <Typography variant="h4" align="center" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  if (!solution) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, rgba(129, 144, 144, 0.1), rgba(77, 205, 165, 0.1))'
          }}
        >
          <Typography variant="h4" align="center" color="gray">Nenhuma solução encontrada.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', my: 4 }}>
      <Box 
        sx={{ 
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper', 
          borderRadius: 4, 
          background: 'linear-gradient(135deg, rgba(0, 99, 212, 0.1), rgba(0, 255, 174, 0.1))'
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#0d8861ff" sx={{pb: 4}} gutterBottom>
          {solution.title}
        </Typography>
        <Card sx={{ 
          mt: 2,
          borderRadius: 2,
          boxShadow: 0,
        }}>
          <CardContent sx={{ textAlign: 'left' }}>
            {solution.priceDollar !== undefined && (
              <Typography variant="h6" gutterBottom>
                <strong>Preço em dólar:</strong> ${solution.priceDollar}
              </Typography>
            )}
            {solution.link && (
              <Typography variant="body1" gutterBottom>
                <strong>Abrir link da solução:</strong> <Link href={solution.link} target="_blank" rel="noopener">{solution.link}</Link>
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              <strong>Categoria:</strong> {CATEGORIES_CONFIG[solution.category as CategoryType]?.label || solution.category}
            </Typography>
            {solution.subcategory && (
              <Typography variant="body1" gutterBottom>
                <strong>Subcategoria:</strong> {getSubcategoryLabel(solution.category as CategoryType, solution.subcategory)}
              </Typography>
            )}
            {solution.description && (
              <Typography variant="body1" gutterBottom>
                <strong>Descrição:</strong> {solution.description}
              </Typography>
            )}
            {solution.dataColeta && (
              <Typography variant="body1" gutterBottom>
                <strong>Data da Coleta:</strong> {formateDate(solution.dataColeta)}
              </Typography>
            )}
            {solution.starRating !== undefined && (
              <Typography variant="body1" gutterBottom>
                <strong>Classificação:</strong> {solution.starRating} / 5
              </Typography>
            )}
            {solution.ownerContact && (solution.ownerContact.email || solution.ownerContact.phone || solution.ownerContact.other) && (
              <>
                <Typography variant="body1" gutterBottom>
                  <strong>Contato do Proprietário:</strong>
                </Typography>
                {solution.ownerContact.email && (
                  <Typography variant="body2">
                    <strong>Email:</strong> {solution.ownerContact.email}
                  </Typography>
                )}
                {solution.ownerContact.phone && (
                  <Typography variant="body2">
                    <strong>Telefone:</strong> {solution.ownerContact.phone}
                  </Typography>
                )}
                {solution.ownerContact.other && (
                  <Typography variant="body2">
                    <strong>Outros:</strong> {solution.ownerContact.other}
                  </Typography>
                )}
                </>
            )}
            {!solution.ownerContact && (
              <Typography variant="body2" color="text.secondary">
                via plataforma
              </Typography>
            )}
            {solution.createdAt && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                <strong>Criado em:</strong> {new Date(solution.createdAt).toLocaleDateString()}
              </Typography>
            )}
          </CardContent>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              alignItems: 'center', 
              flexDirection: 'row', 
              pt: 2, 
              pb: 4
            }}
          >
          {solution.link && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                p: 2,
                color: 'white',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'primary.main',
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'primary.main',
                },
              }}
              onClick={handleDelete}
            >
              ABRIR SOLUÇÃO
              <TouchAppIcon sx={{ ml: 1 }} />
            </Button>
          )}
          {(ADMIN_MODE || adminToken) && (
            <Button
              variant="outlined"
              color="error"
              sx={{
                borderRadius: 2,
                p: 2,
                borderColor: 'error.main',
                color: 'error.main',
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'error.light',
                  color: 'error.contrastText',
                },
              }}
              onClick={handleDelete}
            >
              Excluir Solução
            </Button>
          )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default SolutionDetailsPage;

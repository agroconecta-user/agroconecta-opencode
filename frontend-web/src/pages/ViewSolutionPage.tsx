import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, Pagination, SelectChangeEvent,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getSolutions } from '../api/solution';
import { SolutionCardProps } from '../types/solution';
import { CATEGORIES_CONFIG, CategoryType, getSubcategoryLabel, getSubcategories } from '../utils/categories';
import AdsClickIcon from '@mui/icons-material/AdsClick';

export const ViewSolutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState<SolutionCardProps[]>(() => []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;
  const [open, setOpen] = useState(false);

  const fetchSolutions = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSolutions(selectedCategory);
      let filtered = data;
      if (selectedSubcategory && selectedCategory) {
        filtered = data.filter((s: SolutionCardProps) => s.subcategory === selectedSubcategory);
      }
      setSolutions(filtered);
    } catch (error) {
      console.error('Erro ao buscar as soluções:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedSubcategory]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value as string);
    setSelectedSubcategory('');
    setPage(1);
  };

  const handleSubcategoryChange = (e: SelectChangeEvent<string>) => {
    setSelectedSubcategory(e.target.value as string);
    setPage(1);
  };

  const handleCardClick = (id: string) => {
    console.log('Navigating to solution with ID:', id);
    navigate(`/solution/${id}`);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolutions = Array.isArray(solutions)
    ? solutions.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = Math.ceil(solutions.length / itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth={false} sx={{ mb: 4, px: { xs: 1, sm: 2, md: 4 } }}>
      <Box
        sx={{
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          width: '100%',
          maxWidth: 700,
          mx: 'auto',
          background: 'linear-gradient(135deg, rgba(0, 99, 212, 0.1), rgba(0, 255, 174, 0.1))',
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h3" 
          fontWeight={700} 
          color="#0d8861ff" 
          gutterBottom
          sx={{ 
            mb: 3
          }}
        >
          Encontre Soluções
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ mb: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}
        >
          Explore soluções inovadoras. Filtre a categoria para encontrar o que você precisa.
        </Typography>
        
        <FormControl 
          fullWidth 
          sx={{ 
            mt: 2,
            maxWidth: 400,
            mx: 'auto',
          }}
        >
          <InputLabel id="filter-category-label">
            Filtrar por categoria
          </InputLabel>
          <Select
            labelId="filter-category-label"
            label="Filtrar por categoria"
            value={selectedCategory}
            onChange={handleCategoryChange}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}

            endAdornment={
              <InputAdornment 
                position="end" 
                sx={{ 
                  mr: 2, 
                  cursor: 'pointer'
                }}
                onClick={() => setOpen(true)} 
              >
                <AdsClickIcon />
              </InputAdornment>
            }
            sx={{
              '&:hover .MuiOutlinedInput-fieldset': {
                borderColor: '#0d8861ff',
              },
              '&.Mui-focused .MuiOutlinedInput-fieldset': {
                borderColor: '#0d8861ff',
              },
            }}
          >
              <MenuItem value="">
                <em>Todas as categorias</em>
              </MenuItem>
              {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => (
                <MenuItem key={key} value={key}>
                  {config.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {selectedCategory && (
          <FormControl
            fullWidth
            sx={{
              mt: 2,
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            <InputLabel id="filter-subcategory-label">Filtrar por subcategoria</InputLabel>
            <Select
              labelId="filter-subcategory-label"
              label="Filtrar por subcategoria"
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#008388',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#008388',
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Todas as subcategorias</em>
              </MenuItem>
              {Object.entries(getSubcategories(selectedCategory as CategoryType)).map(([key, sub]) => {
                const subObj = sub as { value: string; label: string };
                return (
                  <MenuItem key={key} value={key}>
                    {subObj.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </Box>

      {loading ? (
        <Box sx={{ 
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          width: '100%',
          maxWidth: '100%',
          background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(13, 136, 97, 0.1))',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px'
        }}>
          <Typography variant="h5" color='#0d8861ff' sx={{ fontWeight: 600 }}>Carregando soluções...</Typography>
        </Box>
      ) : currentSolutions.length === 0 ? (
        <Box sx={{ 
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          width: '100%',
          background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(13, 136, 97, 0.1))',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px'
        }}>
          <Typography 
            variant="h5" 
            color='text.secondary'
            sx={{ 
              textAlign: 'center',
              mb: 2,
              fontWeight: 600
            }}
          >
            Nenhuma solução encontrada
          </Typography>
          <Typography 
            variant="body1" 
            color='text.secondary' 
            sx={{ 
              textAlign: 'center',
              maxWidth: '400px'
            }}
          >
            Tente ajustar os filtros
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
            justifyItems: 'center',
            width: '100%',
          }}
        >
          {currentSolutions.map(solution => (
            <Box key={solution.id} sx={{ width: '100%', maxWidth: 370 }}>
              <Card
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  boxShadow: 0,
                  '&:hover': {
                    boxShadow: '0 8px 20px rgba(13, 136, 97, 0.4)',
                    transform: 'translateY(-4px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
                onClick={() => handleCardClick(solution.id)}
              >
                <CardContent sx={{
                  flexGrow: 1,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        color: '#0d8861ff',
                        mb: 2,
                        lineHeight: 1.3,
                        textAlign: 'left',
                      }}
                    >
                      {solution.title}
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      gap: 1,
                      mb: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.secondary',
                          backgroundColor: 'rgba(18, 205, 146, 0.1)',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          display: 'inline-block',
                          textAlign: 'center',
                        }}
                      >
                        {CATEGORIES_CONFIG[solution.category as CategoryType]?.label || solution.category}
                      </Typography>
                      {solution.subcategory && (
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'text.secondary',
                            backgroundColor: 'rgba(0, 205, 212, 0.1)',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            display: 'inline-block',
                            textAlign: 'center',
                          }}
                        >
                          {getSubcategoryLabel(solution.category as CategoryType, solution.subcategory)}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {solution.priceDollar !== undefined && (
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#0d8861ff',
                        fontWeight: 600,
                        mt: 2,
                        textAlign: 'right',
                      }}
                    >
                      ${solution.priceDollar}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
      {totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 6,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#0d8861ff',
                '&.Mui-selected': {
                  backgroundColor: '#0d8861ff',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(13, 136, 97, 0.6)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(13, 136, 97, 0.1)',
                },
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default ViewSolutionsPage;

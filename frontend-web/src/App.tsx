import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import CreateSolutionPage from './pages/CreateSolutionPage';
import ViewSolutionsPage from './pages/ViewSolutionPage';
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import { SolutionDetailsPage } from './pages/DetalhesPage';
import AdminPage from './pages/AdminPage';

/**
 * Creates a react-router-dom browser router with the routes of the application.
 * @type BrowserRouter
 */
const Router: React.FC = () => { 
  return(
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/storage-solution" element={<CreateSolutionPage />} />
      <Route path="/solutions" element={<ViewSolutionsPage />} />
      <Route path="/solution/:id" element={<SolutionDetailsPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
/**
 * The main application component.
 * @component
 */
export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
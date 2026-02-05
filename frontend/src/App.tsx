import { useEffect, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Stack,
} from '@mui/material';
import { Assessment } from '@mui/icons-material';
import { theme } from './theme';
import { api } from './services/api';
import { SummarySection } from './components/SummarySection';
import { DriversSection } from './components/DriversSection';
import { RiskFactorsSection } from './components/RiskFactorsSection';
import { RecommendationsSection } from './components/RecommendationsSection';
import {
  SummaryResponse,
  DriversResponse,
  RiskFactorsResponse,
  RecommendationsResponse,
} from './types/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [drivers, setDrivers] = useState<DriversResponse | null>(null);
  const [riskFactors, setRiskFactors] = useState<RiskFactorsResponse | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryData, driversData, riskData, recsData] = await Promise.all([
          api.getSummary(),
          api.getDrivers(),
          api.getRiskFactors(),
          api.getRecommendations(),
        ]);

        setSummary(summaryData);
        setDrivers(driversData);
        setRiskFactors(riskData);
        setRecommendations(recsData);
      } catch (err) {
        setError('Failed to load data. Please ensure the backend is running on port 3001.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <Toolbar>
          <Assessment sx={{ mr: 2, fontSize: 32 }} />
          <Box>
            <Typography variant="h5" fontWeight={700}>
              RevenueIQ
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Revenue Intelligence Console
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && summary && drivers && riskFactors && recommendations && (
          <Stack spacing={4}>
            <SummarySection data={summary} />
            <DriversSection data={drivers} />
            <RiskFactorsSection data={riskFactors} />
            <RecommendationsSection data={recommendations} />
          </Stack>
        )}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2026 RevenueIQ - Built with React, TypeScript, Material UI & D3
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

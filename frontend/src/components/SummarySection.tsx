import { Grid, Box, Typography } from '@mui/material';
import { TrendingUp, TrendingDown, GpsFixed, AttachMoney } from '@mui/icons-material';
import { MetricCard } from './MetricCard';
import { SummaryResponse } from '../types/api';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface SummarySectionProps {
  data: SummaryResponse;
}

export const SummarySection = ({ data }: SummarySectionProps) => {
  const isAhead = data.gapPercentage >= 0;
  const isGrowing = data.qoqChange >= 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700} mb={3}>
        Q4 2025 Performance Summary
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Current Quarter Revenue"
            value={formatCurrency(data.currentQuarterRevenue)}
            icon={<AttachMoney />}
            color="primary"
            subtitle="Q4 2025 (Oct-Dec)"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Quarterly Target"
            value={formatCurrency(data.target)}
            icon={<GpsFixed />}
            color="warning"
            subtitle={data.target > 0 ? 'Goal for Q4 2025' : 'No target set'}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Gap to Target"
            value={formatPercentage(data.gapPercentage)}
            icon={isAhead ? <TrendingUp /> : <TrendingDown />}
            color={isAhead ? 'success' : 'error'}
            subtitle={isAhead ? 'Ahead of target' : 'Behind target'}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Quarter-over-Quarter"
            value={formatPercentage(data.qoqChange)}
            icon={isGrowing ? <TrendingUp /> : <TrendingDown />}
            color={isGrowing ? 'success' : 'error'}
            trend={{
              value: data.qoqChange,
              label: 'vs Q3 2025',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

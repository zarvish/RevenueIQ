import { Grid, Box, Typography } from '@mui/material';
import { AccountBalance, ShowChart, MonetizationOn, Schedule } from '@mui/icons-material';
import { MetricCard } from './MetricCard';
import { DriversResponse } from '../types/api';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface DriversSectionProps {
  data: DriversResponse;
}

export const DriversSection = ({ data }: DriversSectionProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700} mb={3}>
        Revenue Performance Drivers
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Pipeline Size"
            value={formatCurrency(data.pipelineSize)}
            icon={<AccountBalance />}
            color="primary"
            subtitle="Active opportunities"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Win Rate"
            value={`${data.winRate.toFixed(1)}%`}
            icon={<ShowChart />}
            color={data.winRate >= 50 ? 'success' : 'warning'}
            subtitle="Closed won / total closed"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Average Deal Size"
            value={formatCurrency(data.averageDealSize)}
            icon={<MonetizationOn />}
            color="success"
            subtitle="Per closed deal"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Sales Cycle Time"
            value={`${formatNumber(data.salesCycleTime)} days`}
            icon={<Schedule />}
            color="warning"
            subtitle="Average time to close"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

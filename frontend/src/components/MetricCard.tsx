import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'primary' | 'success' | 'error' | 'warning';
}

export const MetricCard = ({ title, value, subtitle, icon, trend, color = 'primary' }: MetricCardProps) => {
  const getTrendColor = (value: number) => {
    if (value > 0) return 'success.main';
    if (value < 0) return 'error.main';
    return 'text.secondary';
  };

  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          {icon && <Box sx={{ color: `${color}.main`, opacity: 0.8 }}>{icon}</Box>}
        </Box>

        <Typography variant="h3" fontWeight={700} mb={1}>
          {value}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}

        {trend && (
          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: getTrendColor(trend.value) }}
            >
              {trend.value >= 0 ? '+' : ''}
              {trend.value.toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {trend.label}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

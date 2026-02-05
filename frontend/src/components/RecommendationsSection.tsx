import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import {
  PriorityHigh,
  TrendingUp,
  School,
  PhoneInTalk,
  Lightbulb,
} from '@mui/icons-material';
import { RecommendationsResponse } from '../types/api';

interface RecommendationsSectionProps {
  data: RecommendationsResponse;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'deals':
      return <TrendingUp />;
    case 'coaching':
      return <School />;
    case 'activity':
      return <PhoneInTalk />;
    case 'strategic':
      return <Lightbulb />;
    default:
      return <PriorityHigh />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'default';
  }
};

export const RecommendationsSection = ({ data }: RecommendationsSectionProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700} mb={3}>
        Recommended Actions
      </Typography>

      <Stack spacing={2}>
        {data.recommendations.map((rec, index) => (
          <Card
            key={index}
            sx={{
              background:
                rec.priority === 'high'
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(220, 38, 38, 0.08) 100%)'
                  : rec.priority === 'medium'
                  ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%)',
              borderLeft: `4px solid`,
              borderLeftColor:
                rec.priority === 'high'
                  ? 'error.main'
                  : rec.priority === 'medium'
                  ? 'warning.main'
                  : 'primary.main',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateX(4px)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="flex-start" gap={2}>
                <Box
                  sx={{
                    color:
                      rec.priority === 'high'
                        ? 'error.main'
                        : rec.priority === 'medium'
                        ? 'warning.main'
                        : 'primary.main',
                    mt: 0.5,
                  }}
                >
                  {getCategoryIcon(rec.category)}
                </Box>

                <Box flex={1}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Chip
                      label={rec.priority.toUpperCase()}
                      size="small"
                      color={getPriorityColor(rec.priority) as any}
                      sx={{ fontWeight: 600 }}
                    />
                    <Chip
                      label={rec.category}
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>

                  <Typography variant="body1" fontWeight={600} mb={1}>
                    {rec.message}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    💡 {rec.impact}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

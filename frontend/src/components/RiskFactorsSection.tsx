import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Warning, Person, Business } from '@mui/icons-material';
import { RiskFactorsResponse } from '../types/api';
import { formatCurrency } from '../utils/formatters';

interface RiskFactorsSectionProps {
  data: RiskFactorsResponse;
}

export const RiskFactorsSection = ({ data }: RiskFactorsSectionProps) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700} mb={3}>
        Risk Factors & Alerts
      </Typography>

      <Grid container spacing={3}>
        {/* Stale Deals */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%)',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Warning color="error" />
                <Typography variant="h6" fontWeight={600}>
                  Stale Deals
                </Typography>
                <Chip
                  label={data.staleDeals.length}
                  size="small"
                  color="error"
                  sx={{ ml: 'auto' }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" mb={2}>
                Deals open &gt; 60 days
              </Typography>

              <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account</TableCell>
                      <TableCell align="right">Days</TableCell>
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.staleDeals.slice(0, 5).map((deal) => (
                      <TableRow key={deal.dealId} hover>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                            {deal.accountName}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={deal.daysOpen}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {formatCurrency(deal.amount)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Underperforming Reps */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Person color="warning" />
                <Typography variant="h6" fontWeight={600}>
                  Underperforming Reps
                </Typography>
                <Chip
                  label={data.underperformingReps.length}
                  size="small"
                  color="warning"
                  sx={{ ml: 'auto' }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" mb={2}>
                Win rate &lt; 40% or below team avg
              </Typography>

              <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rep</TableCell>
                      <TableCell align="right">Win Rate</TableCell>
                      <TableCell align="right">Deals</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.underperformingReps.map((rep) => (
                      <TableRow key={rep.repId} hover>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 100 }}>
                            {rep.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${rep.winRate}%`}
                            size="small"
                            color="warning"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {rep.dealsWon}/{rep.totalDeals}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Activity Accounts */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Business color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Low Activity Accounts
                </Typography>
                <Chip
                  label={data.lowActivityAccounts.length}
                  size="small"
                  color="primary"
                  sx={{ ml: 'auto' }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary" mb={2}>
                No contact in 30+ days (or no activities recorded)
              </Typography>

              <TableContainer sx={{ maxHeight: 300 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account</TableCell>
                      <TableCell align="right">Days</TableCell>
                      <TableCell align="right">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.lowActivityAccounts.slice(0, 5).map((account) => (
                      <TableRow key={account.accountId} hover>
                        <TableCell>
                          <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                            {account.accountName}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={
                              account.daysSinceLastActivity === 999
                                ? 'No Activity'
                                : account.daysSinceLastActivity
                            }
                            size="small"
                            color={account.daysSinceLastActivity === 999 ? 'error' : 'primary'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {formatCurrency(account.openDealValue)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

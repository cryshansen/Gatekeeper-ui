import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getDashboard, deleteRecord } from '../api/dashboard';
import { ApiError } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { notifyUnauthorized } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recordId, setRecordId] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        notifyUnauthorized();
        return;
      }
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [notifyUnauthorized]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleDelete = async () => {
    if (!recordId) return;
    setDeleting(true);
    setDeleteResult(null);
    setDeleteError(null);
    try {
      const result = await deleteRecord(recordId);
      setDeleteResult(result?.message || 'Record deleted.');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        notifyUnauthorized();
        return;
      }
      setDeleteError(err.message || 'Failed to delete record.');
    } finally {
      setDeleting(false);
    }
  };

  const isAdmin = dashboard?.role === 'Admin';

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Secure
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            Dashboard
          </Typography>
        </Box>
        <Tooltip title="Refresh">
          <IconButton onClick={loadDashboard} disabled={loading} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : dashboard ? (
        <Card variant="outlined">
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {dashboard.message}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Identity</Typography>
                <Typography>{dashboard.identity}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography color="text.secondary">Role</Typography>
                <Chip
                  label={dashboard.role}
                  color={isAdmin ? 'primary' : 'default'}
                  size="small"
                />
              </Box>
            </Box>

            {isAdmin && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Admin: delete a record
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    label="Record ID"
                    size="small"
                    value={recordId}
                    onChange={(e) => setRecordId(e.target.value)}
                    type="number"
                  />
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={handleDelete}
                    disabled={deleting || !recordId}
                  >
                    {deleting ? 'Deleting…' : 'Delete'}
                  </Button>
                </Box>
                {deleteResult && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    {deleteResult}
                  </Alert>
                )}
                {deleteError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {deleteError}
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ) : null}
    </Container>
  );
}

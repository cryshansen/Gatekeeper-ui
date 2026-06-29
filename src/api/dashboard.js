import { apiFetch } from './client';

export function getDashboard() {
  return apiFetch('/api/secure/dashboard', {
    method: 'GET',
  });
}

export function deleteRecord(id) {
  return apiFetch(`/api/secure/delete-record/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}

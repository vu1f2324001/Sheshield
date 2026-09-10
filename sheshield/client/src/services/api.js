const API_BASE = '/api/v1';

export async function fetchSchemeMatches(profile) {
  const response = await fetch(`${API_BASE}/schemes/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile }),
  });
  return response.json();
}

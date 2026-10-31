const AI_API = '/ai/recommend';

export async function getAIRecommendations(query) {
  const response = await fetch(AI_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();

  console.log('PROXY RESPONSE:', JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(data.detail || data.message || 'AI recommendation failed');
  }

  return data;
}
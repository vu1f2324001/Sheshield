// Load environment variables first
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await connectDB();
    }

    app.listen(PORT, () => {
      console.log(`Sheshield 2.0 Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

// Direct Google Search for Government Schemes
app.post('/api/search-schemes', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Query is required.'
      });
    }

    const searchQuery = encodeURIComponent(
      query + ' government scheme India site:gov.in OR site:nic.in'
    );

    const googleUrl =
      'https://html.duckduckgo.com/html/?q=' + searchQuery;

    const response = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      throw new Error('Search provider unavailable');
    }

    const html = await response.text();
    const results = [];

    const titleMatches = [
      ...html.matchAll(
        /<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/gi
      )
    ];

    const snippetMatches = [
      ...html.matchAll(
        /<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi
      )
    ];

    for (let i = 0; i < Math.min(titleMatches.length, 3); i++) {
      const cleanTitle = titleMatches[i][1]
        .replace(/<[^>]+>/g, '')
        .trim();

      const cleanSnippet = snippetMatches[i]
        ? snippetMatches[i][1].replace(/<[^>]+>/g, '').trim()
        : 'Please check the official government portal for details.';

      results.push({
        id: `SCHEME_LIVE_${i + 1}`,
        name: cleanTitle || 'Government Scheme',
        portalName: 'Search result - verify official portal',
        grant: 'Check official scheme details',
        desc: cleanSnippet,
        requiredDocs: [],
        verificationStatus: 'UNVERIFIED'
      });
    }

    return res.json({
      success: true,
      schemes: results
    });

  } catch (error) {
    console.error('Search Error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Scheme search is temporarily unavailable.'
    });
  }
});

// Start backend
startServer();
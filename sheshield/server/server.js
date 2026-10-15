const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}


// Direct Google Search for Maharashtra Govt Schemes
app.post('/api/search-schemes', async (req, res) => {
  try {
    const { query } = req.body;
      return res.status(400).json({ error: 'Query is required' });
    }

    const searchQuery = encodeURIComponent(query + ' women scheme maharashtra government site:gov.in OR site:nic.in OR site:maharashtra.gov.in');
    const googleUrl = 'https://html.duckduckgo.com/html/?q=' + searchQuery;

    const response = await fetch(googleUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });

    const html = await response.text();
    const results = [];
    
    // Parse search results links and snippets
    const linkMatches = [...html.matchAll(/<a class="result__url"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    const titleMatches = [...html.matchAll(/<h2 class="result__title">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/gi)];
    const snippetMatches = [...html.matchAll(/<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi)];

    for (let i = 0; i < Math.min(titleMatches.length, 3); i++) {
      const cleanTitle = titleMatches[i][1].replace(/<[^>]+>/g, '').trim();
      const cleanSnippet = snippetMatches[i] ? snippetMatches[i][1].replace(/<[^>]+>/g, '').trim() : 'Official government welfare and subsidy scheme portal.';
      
      results.push({
        id: 'SCHEME_LIVE_' + (i + 1),
        name: cleanTitle || 'Government Welfare Scheme',
        portalName: 'Official Govt Portal (Google Live Search)',
        grant: 'Direct DBT / State Subsidy Assistance',
        desc: cleanSnippet,
        requiredDocs: [
          { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar', 'uidai'], disallowed: ['marksheet'] },
          { id: 'income_cert', name: 'Income Certificate', allowed: ['income', 'tehsildar', 'revenue'], disallowed: ['aadhaar'] },
          { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank'], disallowed: ['apaar'] }
        ]
      });
    }

    if (results.length > 0) {
      return res.json({ schemes: results });
    }

    // Fallback schemes if search engine rate-limits
    return res.json({
      schemes: [
        {
          id: 'SCHEME_DIRECT_WIDOW',
          name: 'Indira Gandhi / Sanjay Gandhi Niradhar Mahila Pension Scheme',
          portalName: 'Social Justice Dept (Maharashtra)',
          grant: '₹1,500 / Month Direct DBT',
          desc: 'Direct state social security & pension assistance for widow & destitute women.',
          requiredDocs: [
            { id: 'aadhaar', name: 'Aadhaar Card', allowed: ['aadhaar', 'adhar'], disallowed: ['marksheet'] },
            { id: 'death_cert', name: 'Husband Death Certificate', allowed: ['death', 'mrutyu'], disallowed: ['marksheet'] },
            { id: 'income_cert', name: 'Income Certificate', allowed: ['income', 'tehsildar'], disallowed: ['aadhaar'] },
            { id: 'passbook', name: 'Bank Passbook (DBT)', allowed: ['passbook', 'bank'], disallowed: ['apaar'] }
          ]
        }
      ]
    });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Sheshield 2.0 Backend running on port ${PORT}`);
});

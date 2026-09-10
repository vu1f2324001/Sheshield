exports.login = async (req, res) => {
  res.json({ success: true, token: 'demo-jwt-token-2026', user: { name: 'Akshada', email: 'akshada@example.com' } });
};

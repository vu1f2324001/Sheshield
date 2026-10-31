const hitMap = new Map();

module.exports = (limit = 100, windowMs = 60000) => (req, res, next) => {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const userData = hitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + windowMs;
  } else {
    userData.count += 1;
  }

  hitMap.set(ip, userData);
  if (userData.count > limit) {
    return res.status(429).json({ success: false, message: 'Too many requests. Please try again shortly.' });
  }
  next();
};

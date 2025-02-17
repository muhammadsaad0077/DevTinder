const base_url = process.env.NODE_ENV === 'development'? "http://localhost:5173": "https://codetinder.site";

module.exports = base_url;
exports.DATABASE_URL = process.env.MONGODB_URI ||
    'mongodb://localhost/directors-notes-app';
exports.PORT = process.env.PORT || 8080;
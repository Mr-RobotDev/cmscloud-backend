export default () => ({
  port: process.env.PORT || 8080,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  spaces: {
    cdn: process.env.SPACES_CDN_ENDPOINT,
    endpoint: process.env.SPACES_ENDPOINT,
    bucket: process.env.SPACES_BUCKET,
    region: process.env.SPACES_REGION,
    accessKey: process.env.SPACES_ACCESS_KEY,
    secretKey: process.env.SPACES_SECRET_KEY,
  },
});

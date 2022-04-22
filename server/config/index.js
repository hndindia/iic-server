exports.config = {
  db_uri: process.env.DATABASE,
  db_password: process.env.DATABASE_PASSWORD,
  node_env: process.env.NODE_ENV || "development",
  web_port: process.env.PORT || 3001,
  jwt_key: process.env.JWT_KEY,
  jwt_expire: process.env.JWT_EXPIRE,
  
};

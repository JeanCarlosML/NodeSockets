import dotenv from "dotenv";
// Cargando el archivo de variables de entorno
dotenv.config();
export const config = {
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/cafe",
  },
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "SEED-SECRET",
    expired: process.env.JWT_EXPIRED || 50000,
  },
  google: {
    id: process.env.GOOGLE_ID || "GOOGLE_ID",
    secret: process.env.GOOGLE_SECRET || "GOOGLE_SECRET",
  },
  cloudinary: {
    domain: process.env.CLOUD_NAME || "YOU-CLOUD-NAME",
    key: process.env.CLOUD_KEY || "YOU-API-KEY",
    keySecret: process.env.CLOUD_KEY_SECRET || "YOU-API-SECRET-KEY",
  },
};

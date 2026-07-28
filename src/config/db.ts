import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL as string;
let cachedDb: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri);
  await client.connect();
  cachedDb = client.db("Devo-Data");
  console.log("Database connected successfully!");
  return cachedDb;
};
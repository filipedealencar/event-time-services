import mongoose, { Model } from "mongoose";
import logger from "./logger";

/**
 * @async
 * @description Conecta-se ao MongoDB usando mongoose, cria um pool de conexões
 * @throws {Error} Erro de conexão do mongoose
 */
export const connectToMongoDB = async (): Promise<void> => {
  try {
    const databaseUri = process.env.DATABASE_URI;

    if (!databaseUri) {
      throw new Error("DATABASE_URI not defined");
    }
    await mongoose.connect(databaseUri).catch((err) => {
      err.message = `${err.message} [connectToMongoDB]`;
      throw err;
    });
    logger.ready("Connected to MongoDB");

    logger.ready("Connected to MongoDB");
  } catch (error) {
    // TODO: handle error with retry
    throw error;
  }
};

/**
 * @async
 * @description Fecha a conexão do mongoose
 * @throws {Error} Erro de conexão do mongoose
 */
export const closeConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.log("Closed MongoDB connection");
  } catch (error: any) {
    logger.error(`Error closing MongoDB connection: ${error.message}`);
  }
};

/**
 * @warning Apenas para uso no desenvolvimento
 */
export const dropDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV !== "DEVELOPMENT") {
    logger.warn("dropDatabase should only be used in development");
    return;
  }
  try {
    await mongoose.connection.dropDatabase();
    logger.log("Dropped database");
  } catch (error: any) {
    logger.error(`Error dropping database: ${error.message}`);
  }
};

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  _id: string;
  title: string;
  date: Date;
  description: string;
}

type YourDocumentType = User | Event;

/**
 * @warning Apenas para uso no desenvolvimento
 * @param {Model[]} modelArray - modelos do mongoose
 */
export const createCollections = async (
  modelArray: Model<YourDocumentType>[]
): Promise<void> => {
  if (process.env.NODE_ENV !== "DEVELOPMENT") {
    logger.warn("createCollections should only be used in development");
    return;
  }
  try {
    await Promise.all(modelArray.map((model) => model.createCollection()));
    logger.log("Created collections");
  } catch (error: any) {
    logger.error(`Error creating collections: ${error.message}`);
  }
};

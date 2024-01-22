import { connectToMongoDB } from "./src/data/_database";
import logger from "./src/data/logger";
import app from "./src/routes";

const port = process.env.PORT || 8888;

const main = async () => {
  await connectToMongoDB();
  app.listen(port, () => {
    logger.ready(`Listening: http://localhost:${port}`);
  });
};

main();

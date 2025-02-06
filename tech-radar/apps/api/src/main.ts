import express from 'express';
import * as path from 'path';
import technologyRoutes from "./routes/technology.routes";
import {connectDB} from "./config/database";
import {logger} from "nx/src/utils/logger";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use("/api/auth", authRoutes);

app.use("/api", technologyRoutes);


const port = process.env.PORT || 8080;
connectDB().then(() => {
  const server = app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}/api`);
  });
  server.on('error', logger.error);
});

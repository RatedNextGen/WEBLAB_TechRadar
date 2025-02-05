/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import technologyRoutes from "./routes/technology.routes";
import {connectDB} from "./config/database";

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use("/api/technologies", technologyRoutes);



const port = process.env.PORT || 8080;
connectDB().then(() => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api`);
  });
  server.on('error', console.error);
});

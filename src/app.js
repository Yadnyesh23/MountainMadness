import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mountain Madness Backend Running 🚀");
});

// Routes
import authRoutes from "./routes/auth.route.js";
import trekRoutes from "./routes/trek.route.js";

app.use("/api/admin", authRoutes);
app.use("/api/treks", trekRoutes);


app.use(errorHandler);

export default app;

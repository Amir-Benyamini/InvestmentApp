import authRoutes from "./auth";
import userRoutes from "./user";
import investmentRoutes from "./investments";
import loansRoutes from "./loans";
import planRoutes from "./plans";
import ratesRoutes from "./rates"

export const initializeRoutes = (app: any) => {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
  app.use("/investments", investmentRoutes);
  app.use("/loans", loansRoutes);
  app.use("/plans", planRoutes);
  app.use("/rates", ratesRoutes);
};

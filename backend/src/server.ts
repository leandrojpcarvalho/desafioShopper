import Application from "./app";
import routes from "./routes";

const PORT = Number(process.env.PORT) || 3000;

const app = new Application(routes);
app.start(PORT);

export default app;
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

// Static File Imports
import { serveStatic } from 'hono/bun';
import path from 'path';

// Middleware Imports
import { logger } from "hono/logger";
import { cors } from "hono/cors";

// Route Imports (omitting full list for brevity, they are still mounted below)
import { registerRoute } from "./routes/register";
import { loginRoute } from "./routes/login";
import { verifyRoute } from "./routes/verify";
import { refreshRoute } from "./routes/refresh";
import { logoutRoute } from "./routes/logout";
import { verifyUser } from "./middleware/verifyUser";
import { user } from "./routes/auth/user";
import { bgRoute } from "./routes/auth/bp";
import { analyzeRoute } from "./routes/auth/anlyze";
import { verifyAdmin } from "./middleware/verifyAdmin";
import { AdminRoute } from "./routes/auth/admin/allUser";
import { websocketRoute } from "./routes/auth/websocket";
import { readingsRoute } from "./routes/auth/admin/readings";
import { emailSendRoute } from "./routes/emailVerification";
import { alertRoute } from "./routes/auth/alerts";
import { getRoute } from "./routes/get-data";
import { userManagementRoute } from "./routes/auth/admin/userManagement";
import { ActivityLogsRoutes } from "./routes/auth/admin/ActivityLogs";
import { SSERoute } from "./routes/auth/SSE";
import { passwordResetRoute } from "./routes/passwordReset";


// --- 1. DEFINE THE API APPLICATION ---
const apiApp = new Hono();

// Middleware setup for the API
apiApp.use(logger());
apiApp.use(
  cors({
    origin: [Bun.env.APP_DOMAIN_NAME!],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

apiApp.use("/auth/*", verifyUser);
apiApp.use("/auth/admin/*", verifyAdmin);

// Routes setup for the API (Re-using your provided routes)
apiApp.route("/register", registerRoute);
apiApp.route("/email-verification", emailSendRoute);
apiApp.route("/password-reset", passwordResetRoute);
apiApp.route("/login", loginRoute);
apiApp.route("/verify", verifyRoute);
apiApp.route("/refresh", refreshRoute);
apiApp.route("/auth/logout", logoutRoute);
apiApp.route("/bp-google-sheet", getRoute);
apiApp.route("/auth/user", user);
apiApp.route("/auth/bp", bgRoute);
apiApp.route("/auth/ws/bp", websocketRoute);
apiApp.route("/auth/analyze", analyzeRoute);
apiApp.route("/auth/alerts", alertRoute);
apiApp.route("/auth/ws", SSERoute);
apiApp.route("/auth/admin/users", AdminRoute);
apiApp.route("/auth/admin/readings", readingsRoute);
apiApp.route("/auth/admin/userManagement", userManagementRoute);
apiApp.route("/auth/admin/logs", ActivityLogsRoutes);



const serverApp = new Hono();
const { websocket } = createBunWebSocket<ServerWebSocket>();



const STATIC_ROOT = path.join(import.meta.dir, '..', '..', 'dist'); 
console.log(`[Hono] Serving static files from: ${STATIC_ROOT}`); 



serverApp.route("/api", apiApp);



serverApp.get('/', 
  serveStatic({
    root: '../',
    path: 'dist/index.html',
  })
);



serverApp.use(
  '/*', 
  serveStatic({
    root: '../dist', 
  })
);


//for spa router
serverApp.get('*', 
  serveStatic({
    root: '../',
    path: 'dist/index.html', 
  })
);

export default {
  port: 3000,
  fetch: serverApp.fetch, 
  websocket,
};

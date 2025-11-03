import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET || 'local-dev-secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Not secure for local development
      maxAge: sessionTtl,
    },
  });
}

// Create a mock user for local development
const mockUser = {
  claims: {
    sub: 'local-dev-user',
    email: 'dev@example.com',
    first_name: 'Local',
    last_name: 'Developer',
    profile_image_url: 'https://via.placeholder.com/150',
    exp: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days
  },
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_at: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days
};

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Create a mock user in the database for local development
  try {
    await storage.upsertUser({
      id: mockUser.claims.sub,
      email: mockUser.claims.email,
      firstName: mockUser.claims.first_name,
      lastName: mockUser.claims.last_name,
      profileImageUrl: mockUser.claims.profile_image_url,
    });
  } catch (error) {
    console.error("Error creating mock user:", error);
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  // Mock authentication routes for local development
  app.get("/api/login", (req, res) => {
    req.login(mockUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.redirect("/");
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // Auto-login with mock user if not authenticated
  if (!req.isAuthenticated()) {
    req.login(mockUser, (err) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return next();
    });
    return;
  }

  return next();
};
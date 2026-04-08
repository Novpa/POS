export const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents JavaScript access
  secure: true, // Ensures HTTPS
  sameSite: "lax", // Protects against CSRF
  maxAge: 3600000, // 1 hour in milliseconds
};

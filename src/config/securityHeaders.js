/**
 * Content Security Policy Configuration
 * Defines security headers for the application
 */

export const cspHeaders = {
  // Content Security Policy - Prevents XSS and injection attacks
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' https: ws: wss:; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'",

  // Prevents MIME type sniffing
  'X-Content-Type-Options': 'nosniff',

  // Clickjacking protection
  'X-Frame-Options': 'DENY',

  // XSS protection
  'X-XSS-Protection': '1; mode=block',

  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions policy (Feature policy)
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',

  // Strict Transport Security (for HTTPS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

/**
 * Apply security headers to response
 * @param {Object} res - Express response object
 */
export const applySecurityHeaders = (res) => {
  Object.entries(cspHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });
};

# Content Security Policy (CSP) Implementation Guide

## Overview
CSP is a security standard that helps prevent cross-site scripting (XSS), clickjacking, and other code injection attacks.

## How CSP Works with Your Code

### 1. **LoginModal Component** - Safe by Default
Your LoginModal already follows CSP best practices:
- ✅ No inline event handlers (uses onClick callbacks)
- ✅ No dynamic script execution
- ✅ Uses React's built-in XSS protection
- ✅ Sanitized SVG elements

```jsx
// ✅ SAFE - Uses event handler prop
<button className="modal-close" onClick={onClose}>
  <svg>...</svg>
</button>

// ✅ SAFE - Dynamic content is escaped by React
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

### 2. **CSP Headers Explanation**

```
default-src 'self'
- Only allow resources from same origin by default
```

```
script-src 'self' 'unsafe-inline' 'unsafe-eval'
- Allow scripts from same origin
- 'unsafe-inline' allows inline scripts (for Vite HMR)
- 'unsafe-eval' allows eval (needed for development)
- NOTE: In production, remove 'unsafe-inline' and 'unsafe-eval'
```

```
style-src 'self' 'unsafe-inline'
- Allow CSS from same origin and inline styles
```

```
img-src 'self' data: https:
- Allow images from same origin, data URLs, and HTTPS
```

```
connect-src 'self' https: ws: wss:
- Allow connections to same origin and secure protocols
- ws/wss for WebSocket (Vite HMR)
```

```
frame-ancestors 'none'
- Prevent framing/embedding of your site
```

```
form-action 'self'
- Forms can only submit to same origin
```

### 3. **Where CSP Headers Are Set**

#### Option A: Vite Config (Development)
File: `vite.config.js`
```javascript
export default defineConfig({
  server: {
    middleware: (app) => {
      app.use((req, res, next) => {
        res.setHeader('Content-Security-Policy', '...');
        next();
      });
    }
  }
})
```

#### Option B: Using Security Headers Module
File: `src/config/securityHeaders.js`
```javascript
export const cspHeaders = {
  'Content-Security-Policy': '...',
  'X-Content-Type-Options': 'nosniff',
  // ... other headers
};
```

#### Option C: For Production (Express/Node.js)
```javascript
import express from 'express';
import helmet from 'helmet';

const app = express();

// Using helmet middleware (recommended)
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https:", "ws:", "wss:"],
  }
}));
```

### 4. **CSP Directives for Your Components**

Your LoginModal needs these CSP directives:

| Directive | Why Needed | Your Usage |
|-----------|-----------|-----------|
| `script-src` | JavaScript execution | React, event handlers |
| `style-src` | CSS styles | LoginModal.css |
| `img-src` | Image resources | SVG elements in buttons |
| `font-src` | Fonts | System fonts in CSS |
| `connect-src` | API calls | Form submissions |

### 5. **Making LoginModal Fully CSP Compliant**

Your code is already compliant! But here are best practices:

```jsx
// ✅ GOOD - Event handlers
<button onClick={handleSubmit}>Submit</button>

// ❌ BAD - Inline event (violates CSP)
<button onclick="handleSubmit()">Submit</button>

// ✅ GOOD - Dynamic classes
className={isOpen ? 'active' : ''}

// ❌ BAD - Inline styles (violates CSP)
style={{ color: 'red' }}
```

### 6. **Testing CSP**

Open browser DevTools (F12) → Console
If CSP blocks anything, you'll see errors like:
```
Refused to load the script 'script.js' because it violates the following Content Security Policy directive...
```

### 7. **Production vs Development**

#### Development (Relaxed)
```
script-src 'self' 'unsafe-inline' 'unsafe-eval'
```
- Needed for Vite HMR (Hot Module Replacement)
- Needed for React development tools

#### Production (Strict)
```
script-src 'self' 'nonce-{random}' 'strict-dynamic'
```
- No 'unsafe-inline' or 'unsafe-eval'
- Use nonce-based approach for security

### 8. **Implementation Steps**

1. **Development**: Use Vite config (already done ✅)
2. **Production**: Deploy with proper headers
3. **Test**: Run lighthouse audit
4. **Monitor**: Check browser console for violations

### 9. **Common CSP Errors with LoginModal**

| Error | Solution |
|-------|----------|
| SVG blocked | Add `img-src 'self'` |
| Form submission blocked | Add `form-action 'self'` |
| API calls blocked | Add `connect-src` directive |
| Styles not loading | Add `style-src 'unsafe-inline'` |

## Summary

Your LoginModal is **CSP-safe** because:
- ✅ Uses React (automatic XSS protection)
- ✅ No inline event handlers in HTML
- ✅ No eval() or Function() constructor
- ✅ All styles in separate CSS file
- ✅ No dynamic script loading

The CSP headers are now configured in your vite.config.js and available in src/config/securityHeaders.js for production use.

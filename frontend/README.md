# Frontend – ⚛️ React 18 Template

## [⬅️ Back to 2nd step](../guide/Step_2.md)
- … click on the title
- … **or** open: [../guide/Step_2.md](../guide/Step_2.md)

## 🚀 Start dev server
Execute:
```
yarn dev
```

## 🗣 API Proxy
Every call to the frontend dev server starting with `/api/*` will be routed to the backend. The path will be rewritten.

Example:
- Request: `localhost:3500/api` respectively `/api`
- Proxied to: `localhost:3501/`

## 🛠 Pre-installed tools
- styled-components
- axios

## 👍 Allowed tools
Styling:
- Plain CSS files
- styled-components
- CSS modules
- Tailwind CSS

State management:
- Zustand
- Easy Peasy
- ...

## ❌ Forbidden
- Component libraries (MUI, ...)
  - 🙂 we want you to write custom styles
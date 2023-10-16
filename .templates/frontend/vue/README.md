# Frontend – 👀 Vue 3 Template

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
- axios

## 👍 Allowed tools
Styling:
- plain CSS files
- Tailwind CSS

State management:
- Pinia
- Vuex (but Pinia is recommended)

## ❌ Forbidden
- component libraries (Quasar, Buefy, Oruga, ...)
  - 🙂 we want you to write custom styles
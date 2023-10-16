# Frontend – 🛡 Angular Template

## [⬅️ Back to 2nd step](../guide/Step_2.md)
- … click on the title
- … **or** open: [../guide/Step_2.md](../guide/Step_2.md)

## ℹ️ Information

The template has been created using the Angular CLI `ng`.

If you don't have the CLI installed globally, you can use it via:
```
yarn ng
```

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
- SASS

## 👍 Allowed tools
Styling:
- Plain CSS
- SASS
- Tailwind CSS

State management:
- whatever you like (if needed)
- 
## ❌ Forbidden
- Component libraries (Material, ...)
  - 🙂 we want you to write custom styles

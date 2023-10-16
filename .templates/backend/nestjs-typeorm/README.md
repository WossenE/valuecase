# Backend – 🦁 NestJS + 🧱 TypeORM Template

## [⬅️ Back to 2nd step](../guide/Step_2.md)
- … click on the title
- … **or** open: [../guide/Step_2.md](../guide/Step_2.md)

## ℹ️ Info
The template comes with
- TypeScript
- NestJS
- TypeORM
- Files API (upload and read files)

## 🚀 Start dev server
Execute:
```
yarn dev
```

## Nest CLI
Nest has a CLI. You can invoke it the following way:
```
yarn nest
```

## 👾 Tips for new entities
- Register entity in `AppModule.ts`
- Database schema changes are applied automatically by TypeORM

## 🗃 Files API
The frontend templates already provide a function to
upload files:

```
uploadFile(file: File) : Promise<FileUpload>
```
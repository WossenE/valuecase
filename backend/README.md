# Backend – ⚡️ Express + 🔼 Prisma

## [⬅️ Back to 2nd step](../guide/Step_2.md)
- … click on the title
- … **or** open: [../guide/Step_2.md](../guide/Step_2.md)

## ℹ️ Info
The template comes with
- TypeScript
- Express
- Prisma (as ORM)
- Files API (upload and read files)

## 🚀 First start
Execute the following:
```
yarn dev
```

## 👾 Tips regarding Prisma
__Changed schema__:
- 💡 `yarn db:update`
    - validates & formats the schema
    - pushes the new schema to postgres
    - generates new TypeScript client
- ℹ️ `yarn dev` also does what `yarn db:update` does – **but only once!**
- ⚠️ **_If your IDE does not pick up the Prisma changes, restart the TypeScript server of your IDE_**

General tips:
- If you use VS Code: Install Prisma extension
- Validate schema using `yarn prisma validate`
- Format schema using `yarn prisma format`


## 🗃 Files API
The frontend templates already provide a function to
upload files:

```
uploadFile(file: File) : Promise<FileUpload>
```
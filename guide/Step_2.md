# Step 2️⃣: Test the setup

## [⬅️ First step](Step_1.md)
- … click on the title
- … **or** open: [Step_1.md](Step_1.md)

## 2.1 Terminal 1 – Start database 💾
Open a **new terminal**.

Start the database by executing the following:

```bash
./.database/start.sh
```

ℹ️ _Info: You need a fresh database? `[CTRL+C]` to kill docker container and restart the database._

## 2.2 Terminal 2 – Start backend 🌩
Open a **new terminal**.

Execute the following:
```bash
cd backend && yarn dev
```

ℹ️ _Info: The backend should be available here: [http://localhost:3501](http://localhost:3501)_

## 2.3 Terminal 3 – Start frontend 🎨
Open a **new terminal**.

Execute the following:
```bash
cd frontend && yarn dev
```

ℹ️ _Info: The frontend should be available here: [http://localhost:3500](http://localhost:3500)_

## 2.4 Play around – upload an image 🏞

Test that uploading e.g. an image works!

## 2.5 Check backend README

Check out the backend's README:

➡️ **[../backend/README.md](../backend/README.md)**

## 2.6 Check frontend README

Check out the frontend's README:

➡️ **[../frontend/README.md](../frontend/README.md)**

## [Third step ➡️](Step_3.md)
- … click on the title
- … **or** open: [Step_3.md](Step_3.md)
import {Express} from "express";

export function registerRootApi(app: Express) {
    app.get('/', (req, res) => {
        res.send("OK")
    })
}
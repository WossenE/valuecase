import busboy from "connect-busboy";
import express from "express"
import {registerFilesApi} from "./modules/files";
import {registerTextBlockApi} from "./modules/textblock";
import {registerRootApi} from "./modules/root";

const app = express()
const port = 3501

console.log(`Starting API at ${new Date().toISOString()}`)

app.use(busboy());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRootApi(app)
registerFilesApi(app)
registerTextBlockApi(app)

app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})
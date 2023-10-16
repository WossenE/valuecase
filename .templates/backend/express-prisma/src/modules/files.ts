import {Express} from "express";
import * as fs from "fs";
import {v4 as uuidV4} from "uuid"
import {prisma} from "../prisma";
import {createReadStream} from "fs";

const FILE_STORAGE_DIR = './.fileStorage'

export function registerFilesApi(app: Express) {
    app.post("/files", (req, res) => {
        req.pipe(req.busboy);
        req.busboy.on('file', async (event, fileStream, metadata) => {
            const filename = uuidV4()
            const originalFilename : string = metadata.filename as string
            const mimetype : string = metadata.mimeType as string

            if ( !fs.existsSync(FILE_STORAGE_DIR) ) {
                fs.mkdirSync(FILE_STORAGE_DIR, {recursive: true})
            }

            const outStream = fs.createWriteStream(`${FILE_STORAGE_DIR}/${filename}`);

            fileStream.pipe(outStream);

            outStream.on('close', async () => {
                const createdFile = await prisma.file.create({
                    data: {
                        filename: filename,
                        originalFilename: originalFilename,
                        mimetype: mimetype
                    }
                })

                res.status(201).send(createdFile)
            });
        });
    })

    app.get("/files/:id", async (req, res) => {
        const fileEntity = await prisma.file.findUnique({
            where: {
                id: req.params.id
            }
        })

        if ( !fileEntity ) {
            return res.status(404).send("File not found")
        }

        const filePath = FILE_STORAGE_DIR + '/' + fileEntity.filename
        if ( !fs.existsSync(filePath) ) {
            return res.status(500).send("500: Error - File not on disk")
        }

        res.setHeader('Content-Type', fileEntity.mimetype);

        const file = createReadStream(filePath);
        file.pipe(res);
    })
}
import { Express } from "express";
import * as fs from "fs";
import { v4 as uuidV4 } from "uuid";
import { prisma } from "../prisma";
import { createReadStream } from "fs";

const FILE_STORAGE_DIR = "./.fileStorage";

export function registerFilesApi(app: Express) {
  app.post("/files", (req, res) => {
    // console.log(req);

    req.pipe(req.busboy);
    req.busboy.on("file", async (event, fileStream, metadata) => {
      const filename = uuidV4();
      const originalFilename: string = metadata.filename as string;
      const mimetype: string = metadata.mimeType as string;

      if (!fs.existsSync(FILE_STORAGE_DIR)) {
        fs.mkdirSync(FILE_STORAGE_DIR, { recursive: true });
      }

      const outStream = fs.createWriteStream(`${FILE_STORAGE_DIR}/${filename}`);

      fileStream.pipe(outStream);
      let order = -1;

      req.busboy.on("field", (fieldname, val) => {
        console.log({ fieldname });
        if (fieldname === "jsonData") {
          order = JSON.parse(val).order;
          console.log({ order });
        }
        if (!order) {
          return res.status(404).send({ message: "no order" });
        }
      });

      outStream.on("close", async () => {

        const createdFile = await prisma.file.create({
          data: {
            filename: filename,
            originalFilename: originalFilename,
            mimetype: mimetype,
            order: order,
          },
        });

        res.status(201).send(createdFile);
      });
    });
  });

  app.get("/files", async (req, res) => {
    try {
      const files = await prisma.file.findMany();

      const filesData = files.map((fileEntity) => {
        return {
          id: fileEntity.id,
          mimetype: fileEntity.mimetype,
          order: fileEntity.order,
        };
      });

      res.status(200).json(filesData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal server error");
    }
  });

  app.get("/files/:id", async (req, res) => {
    const fileEntity = await prisma.file.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!fileEntity) {
      return res.status(404).send("File not found");
    }

    const filePath = FILE_STORAGE_DIR + "/" + fileEntity.filename;
    if (!fs.existsSync(filePath)) {
      return res.status(500).send("500: Error - File not on disk");
    }

    res.setHeader("Content-Type", fileEntity.mimetype);

    const file = createReadStream(filePath);
    file.pipe(res);
  });
}

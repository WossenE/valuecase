import { Express } from "express";
import { prisma } from "../prisma";

export function registerTextBlockApi(app: Express) {
  app.post("/textblocks", async (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.order) {
      return res
        .status(400)
        .json({ error: "Please provide title, body, and order" });
    }

    const jsonData: { title: string; body: string; order: Number } = req.body;

    try {
      const textBlock = await prisma.textBlock.create({
        data: {
          title: jsonData.title,
          body: jsonData.body,
          order: Number(jsonData.order),
        },
      });
      res.status(201).json(textBlock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/textblocks", async (req, res) => {
    try {
      const textBlocks = await prisma.textBlock.findMany();
      res.status(200).json(textBlocks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/textblocks/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const textBlock = await prisma.textBlock.findUnique({
        where: { id: id },
      });

      if (!textBlock) {
        return res
          .status(404)
          .json({ error: `Textblock with id ${id} not found` });
      }

      res.status(200).json(textBlock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/textblocks/:id", async (req, res) => {
    const { id } = req.params;
    const textBlock = await prisma.textBlock.findUnique({
      where: { id: id },
    });

    if (!textBlock) {
      return res
        .status(404)
        .json({ error: `Textblock with id ${id} not found` });
    }

    const { title, body } = req.body;

    try {
      const updatedTextBlock = await prisma.textBlock.update({
        where: { id: id },
        data: {
          title,
          body,
        },
      });

      res.status(200).json(updatedTextBlock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/textblocks/:id", async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.textBlock.delete({
        where: { id },
      });

      res.status(204).send({"message": "Deleted Successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}

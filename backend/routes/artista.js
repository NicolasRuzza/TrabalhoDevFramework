const express = require("express");
const { ObjectId } = require("mongodb");
const { getCollection } = require("../database");

const router = express.Router();
const artistaCollection = getCollection("artista");

// SELECT *
router.get("/", async (req, res) => {
    try {
        const query = await artistaCollection.find({}, {}).toArray();

        res.json(query);
    }
    catch (error) {
        console.error("Erro ao consultar os dados da coleção artista:", error);
        res.status(500).json({ error: "Erro ao consultar os dados" });
    }
});

// SELECT TOP 1 *
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = await artistaCollection.findOne({ _id: new ObjectId(id) }, {});

        res.json(query);
    }
    catch (error) {
        console.error("Erro ao consultar os dados da coleção artista:", error);
        res.status(500).json({ error: "Erro ao consultar os dados" });
    }
});

// INSERT INTO
router.post("/", async (req, res) => {
    try {
        const inserted = await artistaCollection.insertOne(req.body);

        res.status(201).json(inserted);
    }
    catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await artistaCollection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });

        res.status(201).json(updated);
    }
    catch (error) {
        console.error("Erro ao alterar dados:", error);
        res.status(500).json({ error: "Erro ao alterar dados" });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await artistaCollection.deleteOne({ _id: new ObjectId(id) });

        if (deleted.deletedCount) {
            res.status(200).json({ message: 'Documento deletado' });
        } 
        else {
            res.status(404).json({ message: 'Documento não encontrado' });
        }
    } 
    catch (error) {
        console.error('Erro ao deletar o documento:', error);
        res.status(500).json({ message: 'Erro interno' });
    }
});

module.exports = router;
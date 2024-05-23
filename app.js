require("dotenv").config();

const 
    cors    = require("cors"),
    express = require("express"),
    path    = require("path")
;

const { MongoClient, ObjectId } = require("mongodb");

const
    app    = express(),
    port   = process.env.PORT,
    conn   = process.env.MONGO_CONNECTION_STRING,
    client = new MongoClient(conn)
;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "frontend")));

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Conectado a base");
    }
    catch (error) {
        console.error("Erro ao conectar a base:", error);
        throw error;
    }
}

async function startServer() {
    try {
        await connectToDatabase();

        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}

function getCollection (collectionName) {
    return client.db(process.env.DATABASE).collection(collectionName);
}

startServer();
// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------------------

// ARTISTA
app.get("/api/artista", async (req, res) => {
    try {
        const collection = getCollection("artista");
        const cursor = collection.find({}, {});
        const result = await cursor.toArray();

        res.json(result);
    }
    catch (error) {
        console.error("Erro ao consultar os dados da coleção artista:", error);
        res.status(500).json({ error: "Erro ao consultar os dados" });
    }
});

app.post("/api/artista", async (req, res) => {
    try {
        const { nome, pais_de_origem, generos } = req.body;
        console.log("-->",nome,"<-- -->",pais_de_origem,"<-- -->",generos,"<--");

        const collection = getCollection("artista");
        const result = await collection.insertOne(req.body);

        res.status(201).json(result);
    } 
    catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

app.put("/api/artista/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, pais_de_origem, generos } = req.body;
        console.log("Esse é update-->",nome,"<-- -->",pais_de_origem,"<-- -->",generos,"<--");

        const collection = getCollection("artista");
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { nome: nome, pais_de_origem: pais_de_origem, generos: generos } });

        res.status(201).json(result);
    } 
    catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

app.delete("/api/artista/:id", async (req, res) => {
    try {
        const id = req.params.id;
  
        const collection = getCollection("artista");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
        // Check if the document was found and deleted
        if (result.deletedCount) {
            res.status(200).json({ message: 'Document deleted successfully' });
        } 
        else {
            res.status(404).json({ message: 'Document not found' });
        }
    } 
    catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });
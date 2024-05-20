require("dotenv").config();

const 
    cors            = require("cors"),
    express         = require("express"),
    { MongoClient } = require("mongodb"),
    path            = require("path")
;

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
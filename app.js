require("dotenv").config();

const 
    cors    = require("cors"),
    express = require("express"),
    path    = require("path"),
    { MongoClient, ObjectId } = require("mongodb")
;

const
    apiPath  = process.env.API_PATH,
    app      = express(),
    port     = process.env.PORT,
    connectionString = process.env.MONGO_CONNECTION_STRING,
    client   = new MongoClient(connectionString)
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

const artista_path = `${apiPath}/artista`;

// ARTISTA
app.get(artista_path, async (req, res) => {
    try {
        const collection = getCollection("artista");
        const query = await collection.find({}, {}).toArray();

        res.json(query);
    }
    catch (error) {
        console.error("Erro ao consultar os dados da coleção artista:", error);
        res.status(500).json({ error: "Erro ao consultar os dados" });
    }
});

app.get(`${artista_path}/:id`, async (req, res) => {
    try {
        const recordId = req.params.id;

        const collection = getCollection("artista");
        const query = await collection.findOne({_id: new ObjectId(recordId) }, {});

        res.json(query);
    }
    catch (error) {
        console.error("Erro ao consultar os dados da coleção artista:", error);
        res.status(500).json({ error: "Erro ao consultar os dados" });
    }
});

app.post(artista_path, async (req, res) => {
    try {
        const collection = getCollection("artista");
        const result = await collection.insertOne(req.body);

        res.status(201).json(result);
    } 
    catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

app.put(`${artista_path}/:id`, async (req, res) => {
    try {
        const recordId = req.params.id;
        // const { nome, pais_de_origem, generos } = req.body;
        // console.log("Esse é update-->",nome,"<-- -->",pais_de_origem,"<-- -->",generos,"<--");

        const collection = getCollection("artista");
        const result = await collection.updateOne({ _id: new ObjectId(recordId) }, { $set: req.body });

        res.status(201).json(result);
    } 
    catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.status(500).json({ error: "Erro ao inserir dados" });
    }
});

app.delete(`${artista_path}/:id`, async (req, res) => {
    try {
        const recordId = req.params.id;
        const collection = getCollection("artista");
        const result = await collection.deleteOne({ _id: new ObjectId(recordId) });
  
        if (result.deletedCount) {
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
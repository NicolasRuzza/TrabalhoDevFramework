const cors            = require('cors');
const express         = require('express');
const { MongoClient } = require('mongodb');
const path            = require('path');

const app  = express();
const port = 3000;

const uri    = "mongodb+srv://userrr:EKuKJWLcOM7adsrp@trabalhodevframework.gwimkzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/api/artista', async (req, res) => {
    try {
        const database = client.db('gravadora');
        const collection = database.collection('artista');
        const cursor = collection.find({}, {});
        const result = await cursor.toArray();

        res.json(result);
    }
    catch (error) {
        console.error('Erro ao consultar os dados da coleção artista:', error);
        res.status(500).json({ error: 'Erro ao consultar os dados' });
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Conectado a base');
    }
    catch (error) {
        console.error('Erro ao conectar a base:', error);
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
        console.error('Erro ao iniciar o servidor:', error);
    }
}

startServer();
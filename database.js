const { MongoClient } = require("mongodb");

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(mongoConnectionString);

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

function getCollection(collectionName) {
    return client.db(process.env.DATABASE).collection(collectionName);
}

module.exports = {
    connectToDatabase,
    getCollection
};
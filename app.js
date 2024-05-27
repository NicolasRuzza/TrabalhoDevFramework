require("dotenv").config();

const 
    cors    = require("cors"),
    express = require("express"),
    path    = require("path"),
    routerArtista = require("./backend/routes/artista"),
    routerAlbum   = require("./backend/routes/album"),
    routerMusica  = require("./backend/routes/musica"),
    { connectToDatabase } = require("./backend/database")
;

const
    app     = express(),
    port    = process.env.PORT,
    apiPath = process.env.API_PATH
;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "frontend")));

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

startServer();

app.use(`${apiPath}/artista`, routerArtista);
app.use(`${apiPath}/album`, routerAlbum);
app.use(`${apiPath}/musica`, routerMusica);

module.exports = app;
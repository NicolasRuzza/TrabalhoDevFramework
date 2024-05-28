<h1 align="center">Gravadora</h1>

![descrição](frontend/images/banner.png)

<h2 align="left" id="descricaoProjeto">Descrição do Projeto</h2>

<p align="left">Um projeto de site de uma Gravadora para você conseguir criar bibliotecas com seus Artistas ou Bandas, Álbuns e Músicas favoritas!

Navegue pelas diferentes telas e monte sua própria Biblioteca!</p>

<h2 align="left" id="statusProjeto">Status do Projeto</h2>

<h4 align="left">
🚀 Em construção....
</h4>

<h2 align="left" id="tabelaConteudo">Tabela de Conteúdo</h2>

<ul align="left">
<li><a href="#descricaoProjeto">Descrição do Projeto</a></li>
<li><a href="#statusProjeto">Status do Projeto</a></li>
<li><a href="#tabelaConteudo">Tabela de Conteúdo</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#preRequisitos">Pré-requisitos</a></li>
<li><a href="#backend">Rodando o Backend</a></li>
<li><a href="#mapaProjeto">Mapa do Projeto</a></li>
<li><a href="#tecnologias">Tecnologias</a></li>
</ul>

<h2 align="left" id="preRequisitos">Pré-requisitos</h2>

Antes de começar você precisa ter instalado em sua máquina as seguintes ferramentas:
[GIT](https://git-scm.com) e [Node.JS]((https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi)).

Além disto é bom ter um editor para ter uma visão geral do código, como [VSCode](https://code.visualstudio.com/)

<h2 align="left" id="backend">🔨 Rodando o Backend (servidor)</h2>

<p>

```bash
# Clone este repositório
$ git clone <path do repositório >

# Acesse a pasta raiz do projeto no terminal/cmd
$ cd TrabalhoDevFramework

# Instale as dependências
# Instale o node e confira se ele esta realmente instalado com
$ Node -v

# Execute a aplicação de api em modo de desenvolvimento
$ Node app.js

# O servidor inciará na porta: 3000
```
</p>

<h2 align="left" id="mapaProjeto">Mapa do Projeto</h2>

<p align="left">

```
├───backend
│   └───routes
├───frontend
│   ├───images
│   ├───pages
│   ├───scripts
│   └───style
└───node_modules
    ├───.bin
    ├───@mongodb-js
    │   └───saslprep
    │       └───dist
    ├───@types
    │   ├───webidl-conversions
    │   └───whatwg-url
    │       └───lib
    ├───accepts
    ├───array-flatten
    ├───body-parser
    │   └───lib
    │       └───types
    ├───bson
    │   ├───etc
    │   ├───lib
    │   ├───src
    │   │   ├───parser
    │   │   │   └───on_demand
    │   │   └───utils
    │   └───vendor
    │       ├───base64
    │       └───text-encoding
    │           └───lib
    ├───bytes
    ├───call-bind
    │   ├───.github
    │   └───test
    ├───content-disposition
    ├───content-type
    ├───cookie
    ├───cookie-signature
    ├───cors
    │   └───lib
    ├───debug
    │   └───src
    ├───define-data-property
    │   ├───.github
    │   └───test
    ├───depd
    │   └───lib
    │       └───browser
    ├───destroy
    ├───dotenv
    │   └───lib
    ├───ee-first
    ├───encodeurl
    ├───es-define-property
    │   ├───.github
    │   └───test
    ├───es-errors
    │   ├───.github
    │   └───test
    ├───escape-html
    ├───etag
    ├───express
    │   └───lib
    │       ├───middleware
    │       └───router
    ├───finalhandler
    ├───forwarded
    ├───fresh
    ├───function-bind
    │   ├───.github
    │   └───test
    ├───get-intrinsic
    │   ├───.github
    │   └───test
    ├───gopd
    │   ├───.github
    │   └───test
    ├───has-property-descriptors
    │   ├───.github
    │   └───test
    ├───has-proto
    │   ├───.github
    │   └───test
    ├───has-symbols
    │   ├───.github
    │   └───test
    │       └───shams
    ├───hasown
    │   └───.github
    ├───http-errors
    ├───iconv-lite
    │   ├───encodings
    │   │   └───tables
    │   └───lib
    ├───inherits
    ├───ipaddr.js
    │   └───lib
    ├───media-typer
    ├───memory-pager
    ├───merge-descriptors
    ├───methods
    ├───mime
    │   └───src
    ├───mime-db
    ├───mime-types
    ├───mongodb
    │   ├───etc
    │   ├───lib
    │   │   ├───bulk
    │   │   ├───client-side-encryption
    │   │   │   └───providers
    │   │   ├───cmap
    │   │   │   ├───auth
    │   │   │   │   └───mongodb_oidc
    │   │   │   ├───handshake
    │   │   │   └───wire_protocol
    │   │   │       └───on_demand
    │   │   ├───cursor
    │   │   ├───gridfs
    │   │   ├───operations
    │   │   │   └───search_indexes
    │   │   └───sdam
    │   └───src
    │       ├───bulk
    │       ├───client-side-encryption
    │       │   └───providers
    │       ├───cmap
    │       │   ├───auth
    │       │   │   └───mongodb_oidc
    │       │   ├───handshake
    │       │   └───wire_protocol
    │       │       └───on_demand
    │       ├───cursor
    │       ├───gridfs
    │       ├───operations
    │       │   └───search_indexes
    │       └───sdam
    ├───mongodb-connection-string-url
    │   └───lib
    ├───ms
    ├───negotiator
    │   └───lib
    ├───object-assign
    ├───object-inspect
    │   ├───.github
    │   ├───example
    │   └───test
    │       └───browser
    ├───on-finished
    ├───parseurl
    ├───path-to-regexp
    ├───proxy-addr
    ├───punycode
    ├───qs
    │   ├───.github
    │   ├───dist
    │   ├───lib
    │   └───test
    ├───range-parser
    ├───raw-body
    ├───safe-buffer
    ├───safer-buffer
    ├───send
    │   └───node_modules
    │       └───ms
    ├───serve-static
    ├───set-function-length
    │   └───.github
    ├───setprototypeof
    │   └───test
    ├───side-channel
    │   ├───.github
    │   └───test
    ├───sparse-bitfield
    ├───statuses
    ├───toidentifier
    ├───tr46
    │   └───lib
    ├───type-is
    ├───unpipe
    ├───utils-merge
    ├───vary
    ├───webidl-conversions
    │   └───lib
    └───whatwg-url
        └───lib
```

</p>

<h2 align="left" id="features">Features</h2>

- [x] Cadastro de Artistas - Álbuns - Músicas<br>
- [x] Atualização de Artistas - Álbuns - Músicas<br>
- [x] Exclusão de Artistas - Álbuns - Músicas

<h2 align="left" id="tecnologias">🛠 Tecnologias</h2>

As seguintes ferramentas foram usadas na construção do projeto:

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

-[MongoDB-Atlas](https://www.mongodb.com/pt-br/lp/cloud/atlas/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_amers-br_ps-all_desktop_pt-br_lead&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=20378068769&adgroup=154980291281&cq_cmp=20378068769&gad_source=1&gclid=Cj0KCQjwxqayBhDFARIsAANWRnQAdXuSCxPN9lkxinp7Mpgg5M5ZzkYJQjN_skYwTgwTdWe1RJN8H24aAu-cEALw_wcB)<br>
-[Bootstrap](https://getbootstrap.com/)<br>
-[NodeJS](https://nodejs.org/dist/v20.13.1/node-v20.13.1-x64.msi)

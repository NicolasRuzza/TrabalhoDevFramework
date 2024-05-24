const 
    linkApi           = "http://localhost:3000/api/musica",
    tableId           = "musicaTable",
    inputNome         = $("#nome_album"),
    inputPais         = $("#titulo"),
    inputGeneros      = $("#qtd_reproduzida"),
    modalSaveId       = "modalSave",
    btnSaveSelector   = $("#btnSave"),
    modalDeleteId     = "modalDelete",
    btnDeleteSelector = $("#btnDelete"),
    screenName        = "Musica"
;

let table;

function fillFormFields(data) {
    Object.keys(data).forEach(key => {
        const inputElement = $(`#${key}`);

        if (inputElement.length) {
            inputElement.val(data[key]);
        }
    });
}

function getFormValuesFromModal(formId) {
    const formData = {};

    $(`#${formId} form input`).each(function() {
        formData[$(this).attr('id')] = $(this).val();
    });

    return formData;
}

function clearModalForm(modalId) {
    const form = $(`#${modalId} form`)[0];

    if (form) {
        form.reset();
    }
    else {
        console.log("Não foi encontrado form na modal");
    }
}

function showModal (modalId) {
    $(`#${modalId}`).modal("show");
}

function hideModal (modalId) {
    $(`#${modalId}`).modal("hide");
}

function refreshTable (table) {
    table.ajax.reload();
}

function createRequestInfo (method, hasHeader = false, body = null) {
    let requestInfo = { method: method };

    if (hasHeader && body !== null) {
        requestInfo.headers = { "Content-Type": "application/json" };
        requestInfo.body = body;
    }

    return requestInfo;
}

$(document).ready(function() {
    table = $(`#${tableId}`).DataTable({
        fixedHeader: true,
        responsive: true,
        language: { url:"https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json" },
        layout: {
            top2End: function () {
                let toolbar = document.createElement("div");

                toolbar.innerHTML = `
                    <button class="btn btn-success btn-sm insert-btn">
                        <span>
                            <i class="fa-solid fa-floppy-disk"></i>&nbsp;Inserir
                        </span>
                    </button>
                    <button class="btn btn-info btn-sm refresh-btn">
                        <span>
                            <i class="fa-solid fa-sync"></i>&nbsp;Atualizar
                        </span>
                    </button>
                `;
    
                return toolbar;
            },
            topStart: "search",
            topEnd: "pageLength",
            bottomStart: "info",
            bottomEnd: "paging"
        },
        ajax: {
            url: linkApi,
            dataSrc: ""
        },
        columns: [
            { data: "nome_album" },
            { data: "titulo" },
            { data: "qtd_reproduzida" },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-warning btn-sm update-btn" record-id="${data._id}" data-bs-toggle="modal" data-bs-target="#${modalSaveId}">
                            <span>
                                <i class="fa-solid fa-pencil"></i>
                                &nbsp;Editar
                            </span>
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" record-id="${data._id}" data-bs-toggle="modal" data-bs-target="#${modalDeleteId}">
                            <span>
                                <i class="fa-solid fa-xmark"></i>
                                &nbsp; Excluir
                            </span>
                        </button>
                    `;
                }
            }
        ],
        initComplete: function (settings, json) {
            $(`#${tableId}_wrapper`).on("click", ".insert-btn", function() {
                $(`#${modalSaveId} .modal-title`).text(`Inserir ${screenName}`);

                showModal(modalSaveId);
                clearModalForm(modalSaveId);
            });

            $(`#${tableId}_wrapper`).on("click", ".refresh-btn", function() {
                refreshTable(table);
            });

            $(`#${tableId}`).on("click", ".update-btn", function() {
                const id = $(this).attr("record-id");
                btnSaveSelector.attr("record-id", id);

                $(`#${modalSaveId} .modal-title`).text(`Alterar ${screenName}`);

                fetch(`${linkApi}/${id}`, createRequestInfo("GET"))
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    fillFormFields(data);
                })
                .catch(error => console.error("Erro:", error));

                showModal(modalSaveId);
                clearModalForm(modalSaveId);
            });

            $(`#${tableId}`).on("click", ".delete-btn", function() {
                const id = $(this).attr("record-id");
                btnDeleteSelector.attr("record-id", id);
                
                showModal(modalDeleteId);
            });
        }
    });
});

btnSaveSelector.on("click", function() {
    const 
        id = $(this).attr("record-id"),
        method = id ? "PUT" : "POST",
        url = id ? `${linkApi}/${id}` : linkApi,
        formData = JSON.stringify(getFormValuesFromModal(modalSaveId))
    ;

    $(this).removeAttr("record-id");

    fetch(url, createRequestInfo(method, true, formData))
    .then(response => response.json())
    .then(data => {
        console.log(data);
        hideModal(modalSaveId);
        refreshTable(table);
    })
    .catch(error => console.error("Erro:", error));
});

btnDeleteSelector.on("click", function() {
    if ($(this).attr("record-id") !== undefined) {
        const id = $(this).attr("record-id");
        $(this).removeAttr("record-id");

        fetch(`${linkApi}/${id}`, createRequestInfo("DELETE"))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            hideModal(modalDeleteId);
            refreshTable(table);
        })
        .catch(error => console.error("Erro:", error));
    }
});
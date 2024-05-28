linkApi += "/musica";

const
    tableId           = "musicaTable",
    modalSaveId       = "modalSave",
    btnSaveSelector   = $("#btnSave"),
    modalDeleteId     = "modalDelete",
    btnDeleteSelector = $("#btnDelete"),
    screenName        = "Música"
;

function convertSecondsToMMSS (seconds) {
    const minutes = Math.floor(seconds / 60);
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds % 60).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
}

$(document).ready(function() {
    disableCurrentNavLink();

    table = $(`#${tableId}`).DataTable({
        fixedHeader: true,
        responsive: true,
        language: { url: datatableLanguageUrl },
        layout: {
            top2End: renderTableTools(),
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
            {
                data: "qtd_reproducao",
                render: function (data, type, row) {
                    return formatNumberSeparatedByDot(data);
                }
            },
            {
                data: "duracao_secs",
                render: function (data, type, row) {
                    return convertSecondsToMMSS(data);
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return renderSaveAndDeleteButtons(data._id, modalSaveId, modalDeleteId);
                }
            }
        ],
        initComplete: function (settings, json) {
            $(`#${tableId}_wrapper`).on("click", ".insert-btn", function() {
                $(`#${modalSaveId} .modal-title`).text(`Inserir ${screenName}`);

                showModal(modalSaveId);
                clearModalForm(modalSaveId);
            });

            $(`#${tableId}_wrapper`).on("click", ".refresh-btn", function() { refreshTable(table); });

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
        formData = getFormValuesFromModal(modalSaveId)
    ;

    if (formData !== null) {
        $(this).removeAttr("record-id");

        fetch(url, createRequestInfo(method, true, JSON.stringify(formData)))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                hideModal(modalSaveId);
                refreshTable(table);
            })
            .catch(error => console.error("Erro:", error))
        ;
    }
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
            .catch(error => console.error("Erro:", error))
        ;
    }
});
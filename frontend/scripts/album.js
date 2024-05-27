linkApi += "/album";

const
    tableId           = "albumTable",
    modalSaveId       = "modalSave",
    btnSaveSelector   = $("#btnSave"),
    modalDeleteId     = "modalDelete",
    btnDeleteSelector = $("#btnDelete"),
    screenName        = "Álbum"
;

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
            { data: "nome_artista" },
            { data: "nome_do_album" },
            {
                data: "qtd_vendida",
                render: function (data, type, row) {
                    return formatNumberSeparatedByDot(data);
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

            $(`#${tableId}_wrapper`).on("click", ".refresh-btn", refreshTable(table));

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
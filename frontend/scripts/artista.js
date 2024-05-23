let table;

function callModal (modalId, formId = null) {
    $(`#${modalId}`).modal("show");

    if (formId !== null) {
        $(`#${formId}`)[0].reset();
    }
}

function closeModal (modalId, table) {
    $(`#${modalId}`).modal("hide");
    table.ajax.reload();
}

$(document).ready(function() {
    table = $('#artistaTable').DataTable({
        fixedHeader: true,
        responsive: true,
        language: {
            url:"https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json"
        },
        ajax: {
            url: "http://localhost:3000/api/artista",
            dataSrc: ""
        },
        columns: [
            { data: 'nome' },
            { data: 'pais_de_origem' },
            { data: 'generos' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-warning btn-sm update-btn" record-id="${data._id}" data-bs-toggle="modal" data-bs-target="#modalAction">
                            <span>
                                <i class="fa-solid fa-pencil"></i>
                                &nbsp;Editar
                            </span>
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" record-id="${data._id}" data-bs-toggle="modal" data-bs-target="#modalDelete">
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
            $('[data-bs-toggle="tooltip"]').tooltip();

            $('#artistaTable_wrapper').on('click', '.insert-btn', function() {
                $("#modalAction .modal-title").text("Inserir Artista");

                callModal("modalAction", "formAction");
            });

            $('#artistaTable').on('click', '.update-btn', function() {
                const id = $(this).attr("record-id");
                $("#btnAction").attr("record-id", id);

                $("#modalAction .modal-title").text("Alterar Artista");
                callModal("modalAction", "formAction");
            });

            $('#artistaTable').on('click', '.delete-btn', function() {
                const id = $(this).attr("record-id");
                $("#btnDelete").attr("record-id", id);
                
                callModal("modalDelete");
            });
        },
        layout: {
            top2End: function () {
                let toolbar = document.createElement('div');
                toolbar.innerHTML = `
                    <button class="btn btn-success btn-sm insert-btn">
                        <span>
                            <i class="fa-solid fa-floppy-disk"></i>&nbsp;Inserir
                        </span>
                    </button>
                `;
    
                return toolbar;
            },
            topStart: "search",
            topEnd: "pageLength",
            bottomStart: 'info',
            bottomEnd: 'paging'
        }
    });
});

$('#btnAction').on('click', function() {
    const 
        id = $(this).attr("record-id"),
        method = id ? 'PUT' : 'POST',
        url = id ? `http://localhost:3000/api/artista/${id}` : 'http://localhost:3000/api/artista',
        formData = JSON.stringify({
            nome: $('#nome').val(),
            pais_de_origem: $('#pais_de_origem').val(),
            generos: $('#generos').val()
        })
    ;
    $(this).removeAttr("record-id");

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        closeModal("modalAction", table);
    })
    .catch(error => console.error('Erro:', error));
});

$('#btnDelete').on('click', function() {
    if ($(this).attr("record-id") !== undefined) {
        const id = $(this).attr("record-id");
        $(this).removeAttr("record-id");

        fetch(`http://localhost:3000/api/artista/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            closeModal("modalDelete", table);
        })
        .catch(error => console.error('Erro:', error));
    }
});
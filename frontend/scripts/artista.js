function callModal (modalId, formId) {
    $(`#${modalId}`).modal("show");
    $(`#${formId}`)[0].reset();
}

function closeModal (modalId, formId, table) {
    $(`#${modalId}`).modal("hide");
    $(`#${formId}`)[0].reset();
    table.ajax.reload();
}

$(document).ready(function() {
    fetch('http://localhost:3000/api/artista')
        .then(response => response.json())
        .then(jsonResponse => {
            const table = $('#artistaTable').DataTable({
                fixedHeader: true,
                responsive: true,
                language: {
                    url:"https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json"
                },
                data: jsonResponse,
                columns: [
                    { data: 'nome' },
                    { data: 'pais_de_origem' },
                    { data: 'generos' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `
                                <button class="btn btn-warning btn-sm update-btn" data-id="${data._id}" data-bs-toggle="modal" data-bs-target="#modalAction">
                                    <span>
                                        <i class="fa-solid fa-pencil"></i>
                                        &nbsp;Editar
                                    </span>
                                </button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${data._id}" data-bs-toggle="modal" data-bs-target="#modalDelete">
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

                    $('#artistaTable').on('click', '.update-btn', function() {
                        const id = $(this).data('id');
                        
                        callModal("modalAction", "formAction");
                    });
        
                    $('#artistaTable').on('click', '.delete-btn', function() {
                        const id = $(this).data('id');

                        callModal("modalDelete");
                    });

                    $('#artistaTable_wrapper').on('click', '.insert-btn', function() {
                        callModal("modalAction", "formAction");
                    });

                    $('#btnAction').on('click', function() {
                        let formData = JSON.stringify({
                            nome: $('#nome').val(),
                            pais_de_origem: $('#pais_de_origem').val(),
                            generos: $('#generos').val()
                        });

                        fetch('http://localhost:3000/api/artista', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            closeModal("modalAction", "formAction", table);
                        })
                        .catch(error => console.error('Erro:', error));
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
        })
        .catch(error => console.error('Erro:', error))
    ;
});
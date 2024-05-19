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
                                <button class="btn btn-warning btn-sm update-btn" data-id="${data._id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar">
                                    <span>
                                        <i class="fa-solid fa-pencil"></i>
                                    </span>
                                </button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${data._id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir">
                                    <span>
                                        <i class="fa-solid fa-xmark"></i>
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
                        // Handle update logic here
                        console.log('Update button clicked for ID:', id);
                    });
        
                    $('#artistaTable').on('click', '.delete-btn', function() {
                        const id = $(this).data('id');
                        // Handle delete logic here
                        console.log('Delete button clicked for ID:', id);
                    });

                    $('#artistaTable_wrapper .insert-btn').on('click', function() {
                        // Handle insert logic here
                        console.log('Insert button clicked');
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


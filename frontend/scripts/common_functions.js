let 
    linkApi = "http://localhost:3000/api",
    table
;
const datatableLanguageUrl = "https://cdn.datatables.net/plug-ins/1.11.3/i18n/pt_br.json";

function disableCurrentNavLink () {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').split('/').pop() == currentPath) {
            link.classList.add('disabled-link');
            link.removeAttribute('href');
        }
    });
}

function formatNumberSeparatedByDot (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Usa os dados obtidos do GET para preencher a modal de edição
function fillFormFields (data) {
    Object.entries(data).forEach(([key, value]) => {
        const inputElement = $(`#${key}`);

        if (inputElement.length) {
            inputElement.val(value);
        }
    });
}

function getFormValuesFromModal (modalId) {
    const formData = {};
    let hasInvalids = false;

    $(`#${modalId} form input`).each(function() {
        const inputValue = $(this).val();
        
        if (isEmpty(inputValue)) {
            $(this).addClass("is-invalid");
            hasInvalids = true;
        }
        else {
            $(this).removeClass("is-invalid");
        }

        formData[$(this).attr('id')] = inputValue;
    });

    return hasInvalids ? null : formData;
}

function isEmpty (value) {
    return value === undefined || value === "" || value === null;
}

function clearModalForm (modalId) {
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

function renderSaveAndDeleteButtons (recordId, modalSaveId, modalDeleteId) {
    return `
        <button class="btn btn-warning btn-sm update-btn" record-id="${recordId}" data-bs-toggle="modal" data-bs-target="#${modalSaveId}">
            <span>
                <i class="fa-solid fa-pencil"></i>
                &nbsp;Editar
            </span>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" record-id="${recordId}" data-bs-toggle="modal" data-bs-target="#${modalDeleteId}">
            <span>
                <i class="fa-solid fa-xmark"></i>
                &nbsp; Excluir
            </span>
        </button>
    `;
}

function renderTableTools () {
    const tableTools = document.createElement("div");

    tableTools.innerHTML = `
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

    return tableTools;
}
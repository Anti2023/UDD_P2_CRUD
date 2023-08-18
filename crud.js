const form = document.getElementById('form');
const inputProduct = document.getElementById('inputProduct');
const inputPrice = document.getElementById('inputPrice');
const dataTable = document.getElementById('dataTable');

let productList = [];

function onSubmit(event) {
    event.preventDefault();
    const productValue = inputProduct.value.trim();
    const priceValue = parseFloat(inputPrice.value);
    // validaciones para no ingresar campos vacíos
    if (productValue === '') {
        alert('El campo "Producto" es obligatorio');
        return false;
    } else if (isNaN(priceValue)) {
        alert('El campo "Precio" es obligatorio');
        return false;
    }

    const data = {
        product: productValue,
        price: priceValue
    };

    // Agregar a Local Storage
    // let productList = JSON.parse(localStorage.getItem('productList')) || [];
    productList.push(data);
    localStorage.setItem('productList', JSON.stringify(productList));

    // Agregar a la tabla
    const row = dataTable.insertRow();
    const cellProduct = row.insertCell(0);
    const cellPrice = row.insertCell(1);
    const cellActions = row.insertCell(2);

    cellProduct.textContent = data.product;
    cellPrice.textContent = data.price.toFixed(2);
    cellActions.innerHTML = `
            <button class="btn btn-primary" onclick="editRow(this)">Editar</button>
            <button class="btn btn-danger" onclick="deleteRow(this)">Borrar</button>
        `;

    // Limpiar los campos de entrada
    inputProduct.value = '';
    inputPrice.value = '';
}

form.addEventListener('submit', onSubmit);

function editRow(button) {
    const row = button.closest('tr');
    const productCell = row.cells[0];
    const priceCell = row.cells[1];
    const product = productCell.textContent;
    const price = parseFloat(priceCell.textContent);

    inputProduct.value = product;
    inputPrice.value = price.toFixed(2);

    // Eliminar la fila actual
    dataTable.deleteRow(row.rowIndex);

    // Actualizar Local Storage
    // let productList = JSON.parse(localStorage.getItem('productList'));
    productList = productList.filter(item => item.product !== product);
    localStorage.setItem('productList', JSON.stringify(productList));
}

function deleteRow(button) {
    const row = button.closest('tr');
    const productCell = row.cells[0];
    const product = productCell.textContent;


    dataTable.deleteRow(row.rowIndex);


    // let productList = JSON.parse(localStorage.getItem('productList'));
    productList = productList.filter(item => item.product !== product);
    localStorage.setItem('productList', JSON.stringify(productList));
}

// Cargar los datos al cargar la página
window.addEventListener('load', function () {
    productList = JSON.parse(localStorage.getItem('productList')) || [];

    productList.forEach(item => {
        const row = dataTable.insertRow();
        const cellProduct = row.insertCell(0);
        const cellPrice = row.insertCell(1);
        const cellActions = row.insertCell(2);

        cellProduct.textContent = item.product;
        cellPrice.textContent = item.price.toFixed(2);
        cellActions.innerHTML = `
                <button class="btn btn-primary" onclick="editRow(this)">Editar</button>
                <button class="btn btn-danger" onclick="deleteRow(this)">Borrar</button>
            `;
    });
});


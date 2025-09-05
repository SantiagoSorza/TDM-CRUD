import { getItems } from "./services/api.js";


const catalogContainer = document.getElementById("catalogContainer");
const catalogModal = document.getElementById("catalogModal");


// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        const data = await getItems();
        const items = Array.isArray(data) ? data : Object.values(data);
        if (!items.length) {
            catalogContainer.innerHTML = "<p>No hay items para mostrar.</p>";
            return;
        }
        renderItem(items);} catch (err) {
        console.error("Error cargando catálogo:", err);
        catalogContainer.innerHTML = `<p>Error cargando catálogo: ${err.message}</p>`;

    }
}

//imagenes de las opciones de catalogos
const categoryImages = {
    "Mango": "https://cuidateplus.marca.com/sites/default/files/cms/inline-images/mango.jpg",
    "Fresa": "https://cuidateplus.marca.com/sites/default/files/cms/inline-images/fresas_1_0.jpg",
    "Papaya": "https://cuidateplus.marca.com/sites/default/files/cms/inline-images/papaya_0.jpg",
    "Kiwi": "https://cuidateplus.marca.com/sites/default/files/cms/inline-images/kiwiok.jpg"
};

function renderItem(item) {
   
    catalogModal.hidden = true; 

    catalogContainer.innerHTML = "";

    item.forEach(item => {

        //cargar la imagen 
        const imgSrc = categoryImages[item.category];
        const div = document.createElement("div");

        div.classList.add("item");
        div.innerHTML = `
            <img src="${imgSrc} "> 
            <div class="item-body">
            <h2>${item.name}</h2>
            <p><strong> Precio: </strong>$${item.price} COP</p>
            <p><strong> Stock: </strong>$${item.stock} unidades</p>
            <button type="submit" class="detailsButton" id="${item.id}">Detalles</button>`;

        catalogContainer.appendChild(div);

        div.querySelector(".detailsButton").addEventListener("click", () => {
            openModal(item, imgSrc);
        });

    });
}

// Modal
function openModal(item, imgSrc) {
    catalogModal.hidden = false;
        catalogModal.innerHTML = `
        <div class="modal-content">
            <img src="${imgSrc}" alt="${item.category}" class="item-img"> 
            <h3>Nombre: ${item.name}</h3>
            <h3>Id: ${item.id}</h3>
            <h3>Descripcion: ${item.description}</h3>
            <h3>Precio: ${item.price}</h3>
            <h3>Fecha: ${item.date}</h3>
            <h3>Categoria: ${item.category}</h3>
            <button type="button"  id="cerrarButton">Cerrar</button>
        </div>
        `;
        document.getElementById("cerrarButton").addEventListener("click", () => {
        catalogModal.hidden = true;
    });
    
}

document.addEventListener("DOMContentLoaded", loadCatalog);

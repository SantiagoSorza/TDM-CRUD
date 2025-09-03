import { getItems } from "./services/api.js";
// Seleccionamos el contenedor principal del catálogo
const catalogContainer = document.getElementById("catalogContainer");
// Función para renderizar un item en el catálogo
function renderItem(item) {
    // Actualizamos los elementos existentes en el HTML con los datos del item
    document.getElementById("img").src = item.image || "";
    document.getElementById("img").alt = item.name || "Producto";
    document.getElementById("pro-name").textContent = item.name || "Sin nombre";
    document.getElementById("pro-id").textContent = `ID: ${item.id || "-"}`;
    document.getElementById("pro-descrip").textContent = item.description || "Sin descripción";
    document.getElementById("pro-value").textContent = `Precio: ${item.price || "-"}`;
    document.getElementById("pro-date").textContent = `Fecha: ${item.date || "-"}`;
    document.getElementById("pro-categorie").textContent = `Categoría: ${item.category || "-"}`;
    
}
// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        const items = await getItems();
        if (!items.length) {
            catalogContainer.innerHTML = "<p>No hay items para mostrar.</p>";
            return;
        }
        renderItem(items[0]);
    } catch (err) {
        console.error("Error cargando catálogo:", err);
        catalogContainer.innerHTML = `<p>Error cargando catálogo: ${err.message}</p>`;
    }
}
// Inicializar el catálogo cuando cargue la página
loadCatalog();
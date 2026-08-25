import { slugify } from "../utils/slugify.js";

// Recibe un objeto "item" (donador) y devuelve el HTML de su tarjeta.
export default function ItemCard(item) {
  // Ejercicio - Parte A, punto 3: genera el slug con el nombre del donador
  const slug = slugify(item.nombre);

  return `
    <article class="card" data-slug="${slug}">
      <h3>${item.nombre}</h3>
      <p><strong>Grupo Sanguíneo:</strong> ${item.tipoSangre}</p>
      <p><small><strong>Ubicación:</strong> ${item.ubicacion}</small></p>
      <a href="/item/${item.id}" data-link>Ver detalle →</a>
    </article>
  `;
}
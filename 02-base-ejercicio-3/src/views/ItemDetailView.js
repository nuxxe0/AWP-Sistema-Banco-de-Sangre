// TODO (Ejercicio - Parte A, punto 2): completa esta vista.
//
// Esta función recibirá el objeto "params" que tu Router extraiga de la
// URL, por ejemplo params = { id: "2" } para la ruta "/item/2".
//
// Pasos sugeridos:
//   1. Dentro de esta función (NO como import estático arriba del
//      archivo), haz: const { default: ItemsService } = await
//      import("../services/itemsService.js");
//   2. Crea una instancia: const service = new ItemsService();
//   3. Usa service.getById(params.id) para obtener el elemento.
//   4. Si no existe, devuelve un HTML simple indicando "no encontrado".
//   5. Si existe, devuelve un <div class="card"> con sus campos
//      (título, descripción, meta...).
//
// TODO: una vez que funcione, ajusta qué campos mostrar y cómo
// se llaman en pantalla, según tu tema.

export default async function ItemDetailView(params) {
  // 1. Importación dinámica (Lazy loading) de itemsService.js
  const { default: itemsService } = await import("../services/itemsService.js");

  // 2. Obtener el elemento correspondiente mediante el id de la URL
  const item = await itemsService.getById(params.id);

  // 3. Si no existe, devolver un mensaje simple
  if (!item) {
    return `
      <div class="card">
        <h2>Donador no encontrado</h2>
        <p>No se encontró ningún registro para el id: ${params?.id ?? "desconocido"}.</p>
        <a href="/" data-link>← Volver al listado principal</a>
      </div>
    `;
  }

  // 4. Si existe, renderizar la ficha detallada del donador
  return `
    <div class="card">
      <h2>Perfil del Donador: ${item.nombre}</h2>
      <hr />
      <p><strong>Grupo Sanguíneo:</strong> ${item.tipoSangre}</p>
      <p><strong>Ubicación / Municipio:</strong> ${item.ubicacion}</p>
      <p><strong>Estado de Disponibilidad:</strong> ${
        item.disponible ? "Disponible para donar" : "En periodo de espera"
      }</p>
      <br />
      <a href="/" data-link>← Volver al listado</a>
    </div>
  `;
}
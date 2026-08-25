// Servicio "mock": simula una fuente de datos (podría ser un fetch real
// a una API). Exportación por defecto a propósito: la importarás de
// forma DINÁMICA en ItemDetailView.js.
//
// ── TODO ─────────────────────────────────────────────
// Reemplaza el arreglo ITEMS por los datos de tu propio tema (mínimo 4
// elementos, mínimo 3 campos cada uno). Puedes renombrar "ItemsService"
// y "Item" si quieres (ej. RecetasService / Receta), pero no es
// obligatorio: lo que se califica son los datos y los campos, no el
// nombre de la clase.
//
// Ejemplo si tu tema fuera "recetas":
//   { id: "1", title: "Tacos al pastor", description: "...", meta: "30 min" }

const ITEMS = [
  {
    id: "1",
    nombre: "Juan Pérez",
    tipoSangre: "O+",
    ubicacion: "La Paz",
    disponible: true,
  },
  {
    id: "2",
    nombre: "María García",
    tipoSangre: "A-",
    ubicacion: "Los Cabos",
    disponible: true,
  },
  {
    id: "3",
    nombre: "Carlos Mendoza",
    tipoSangre: "O-",
    ubicacion: "La Paz",
    disponible: false,
  },
  {
    id: "4",
    nombre: "Ana Martínez",
    tipoSangre: "B+",
    ubicacion: "La Paz",
    disponible: true,
  },
];

export default class ItemsService {
  async getAll() {
    return ITEMS;
  }

  async getById(id) {
    return ITEMS.find((item) => item.id === id) ?? null;
  }
}
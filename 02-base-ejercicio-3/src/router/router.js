/**
 * Router — enrutador de cliente basado en la History API.
 *
 * Estado actual: SOLO soporta rutas EXACTAS (route.path === path).
 * TODO (Ejercicio - Parte A, punto 1): agrega soporte para rutas con
 * parámetros, como "/item/:id", dentro de matchRoute().
 */
// TODO (Ejercicio - Parte A, punto 1): completa la lógica de emparejamiento.
//
// Tu Router debe ser capaz de reconocer rutas con parámetros dinámicos,
// por ejemplo: "/item/:id".

export default class Router {
  constructor(routes, appElement) {
    this.routes = routes;
    this.appElement = appElement;
  }

  init() {
    // Intercepta los clics en enlaces con el atributo [data-link]
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-link]");
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        this.navigateTo(href);
      }
    });

    // Escucha el evento popstate para la navegación con botones atrás/adelante
    window.addEventListener("popstate", () => {
      this.render(window.location.pathname);
    });

    // Renderiza la vista inicial
    this.render(window.location.pathname);
  }

  navigateTo(path) {
    window.history.pushState(null, null, path);
    this.render(path);
  }

  matchRoute(path) {
    // 1. Intento de coincidencia exacta primero
    const exactRoute = this.routes.find((r) => r.path === path);
    if (exactRoute) {
      return { route: exactRoute, params: {} };
    }

    // 2. Coincidencia para rutas dinámicas como "/item/:id"
    const pathSegments = path.split("/").filter(Boolean);

    for (const route of this.routes) {
      if (!route.path.includes(":")) continue;

      const routeSegments = route.path.split("/").filter(Boolean);

      // Si no tienen la misma cantidad de partes, no es esta ruta
      if (routeSegments.length !== pathSegments.length) continue;

      const params = {};
      let matches = true;

      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(":")) {
          // Extrae el nombre del parámetro (ej. "id") y le asigna su valor
          const paramName = routeSegments[i].slice(1);
          params[paramName] = pathSegments[i];
        } else if (routeSegments[i] !== pathSegments[i]) {
          matches = false;
          break;
        }
      }

      if (matches) {
        return { route, params };
      }
    }

    return null;
  }

  async render(path) {
    const match = this.matchRoute(path);

    if (!match) {
      this.appElement.innerHTML = `
        <div class="card">
          <h2>404 — Página no encontrada</h2>
          <p>La ruta solicitada no existe.</p>
        </div>
      `;
      return;
    }

    // Renderiza la vista encontrada pasándole los parámetros extraídos
    const viewHTML = await match.route.view(match.params);
    this.appElement.innerHTML = viewHTML;
  }
}
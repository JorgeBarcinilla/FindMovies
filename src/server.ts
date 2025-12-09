import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEngine = new AngularAppEngine();

/**
 * El manejador de solicitudes usado por Netlify.
 * @param {Request} request - La solicitud HTTP.
 * @returns {Promise<Response>} - La respuesta HTTP.
 */
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const context = getContext();

  // Aquí puedes definir endpoints de API de ejemplo si los necesitas
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * El manejador de solicitudes usado por Angular CLI (dev-server y durante el build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);

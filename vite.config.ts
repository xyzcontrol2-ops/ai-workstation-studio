import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig, type Plugin } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { isAllowedAyraRequest } from './src/server/api-port-policy.ts'

const FRONTEND_ORIGIN = 'http://localhost:3030'

function addRequestMiddleware(
  server: {
    config: { server?: { port?: number }; preview?: { port?: number } }
    middlewares: {
      use: (
        middleware: (
          request: import('node:http').IncomingMessage,
          response: import('node:http').ServerResponse,
          next: (error?: unknown) => void,
        ) => void,
      ) => void
    }
  },
  port: number | undefined,
): void {
  server.middlewares.use((request, response, next) => {
    const pathname = request.url?.split('?')[0] ?? ''
    if (!isAllowedAyraRequest(port, pathname)) {
      response.statusCode = 404
      response.setHeader('Content-Type', 'application/json; charset=utf-8')
      response.end(JSON.stringify({ error: 'Backend port exposes API routes only.' }))
      return
    }
    if (!applyCorsHeaders(request, response)) next()
  })
}

function applyCorsHeaders(
  request: import('node:http').IncomingMessage,
  response: import('node:http').ServerResponse,
): boolean {
  if (!request.url?.startsWith('/api/')) return false

  const origin = request.headers.origin
  if (origin === FRONTEND_ORIGIN) {
    response.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN)
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    response.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    )
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization,Content-Type,X-Ayra-Owner-Token,Last-Event-ID',
    )
    response.setHeader('Access-Control-Max-Age', '600')
    response.setHeader('Vary', 'Origin')
  }

  if (request.method !== 'OPTIONS') return false
  response.statusCode = origin === FRONTEND_ORIGIN ? 204 : 403
  response.end()
  return true
}

const ayraApiCorsPlugin: Plugin = {
  name: 'ayra-api-cors',
  enforce: 'pre',
  configureServer(server) {
    addRequestMiddleware(server, server.config.server.port)
  },
  configurePreviewServer(server) {
    addRequestMiddleware(server, server.config.preview.port)
  },
}

export default defineConfig({
  server: {
    host: 'localhost',
    port: 3030,
    strictPort: true,
    cors: {
      origin: 'http://localhost:3030',
      credentials: true,
    },
  },
  preview: {
    host: 'localhost',
    port: 3030,
    strictPort: true,
    cors: {
      origin: 'http://localhost:3030',
      credentials: true,
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    ayraApiCorsPlugin,
    tanstackStart({
      srcDirectory: 'src',
    }),
    viteReact(),
    nitro(),
  ],
})

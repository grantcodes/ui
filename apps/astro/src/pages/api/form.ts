import type { APIRoute } from 'astro'

export const prerender = true

export const POST: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({
    error: 'Form submission requires a server. Please deploy with a server adapter.'
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  })
}

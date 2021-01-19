// Based on tutorial at:
// https://ghost.org/docs/jamstack/next/

import GhostContentApi from '@tryghost/content-api'

// Create API instance with Ghost credentials

const url = process.env['GHOST_API_URL'] || ''
const key = process.env['GHOST_API_KEY'] || ''

const api = new GhostContentApi({ url, key, version: 'v3' })

export async function getAllGhostPosts() {
  return await api.posts
    .browse({ limit: 'all' })
    .catch((err) => console.error(err))
}

export async function getSingleGhostPost(postSlug: string) {
  return await api.posts
    .read({ slug: postSlug })
    .catch((err) => console.error(err))
}

// Based on tutorial at:
// https://ghost.org/docs/jamstack/next/

import GhostContentApi from '@tryghost/content-api'

// Create API instance with Ghost credentials

const url = process.env['GHOST_API_URL'] || ''
const key = process.env['GHOST_API_KEY'] || ''

const api = new GhostContentApi({ url, key, version: 'v3' })

export async function getAllGhostPosts() {
  return await api.posts
    .browse({ include: ['tags', 'authors'], limit: 'all' })
    .then((posts: any) => {
      posts = posts.map((post: any) => {
        const author = {
          name: post.primary_author?.name,
          picture: post.primary_author?.profile_image,
        }
        post = {
          ...post,
          ogImage: post.feature_image || null,
          coverImage: post.feature_image || null,
          date: post.updated_at || null,
          author,
        }
        return post
      })
      return posts
    })
  // .catch((err) => console.error(err))
}

export async function getSingleGhostPost(postSlug: string) {
  return (
    (await api.posts
      .read({ slug: postSlug }, { include: ['tags', 'authors'] })
      .then((post: any) => {
        const author = {
          name: post.primary_author?.name,
          picture: post.primary_author?.profile_image,
        }
        post = {
          ...post,
          ogImage: post.feature_image || null,
          coverImage: post.feature_image || null,
          date: post.updated_at || null,
          author,
        }
        return post
      })
      .catch((err) => {
        return undefined
      })) || undefined
  )
}

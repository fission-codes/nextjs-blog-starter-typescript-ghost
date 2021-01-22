import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import {
  getPostBySlug as getMarkdownFilePostBySlug,
  getAllPosts as getAllMarkdownFilePosts,
} from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { getAllGhostPosts, getSingleGhostPost } from '../../lib/ghost'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={post.ogImage?.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  let post

  const ghostPost = await getSingleGhostPost(params.slug)

  if (ghostPost) {
    ghostPost.content = ghostPost.html
    post = ghostPost
  } else {
    const markdownFilePost = getMarkdownFilePostBySlug(params.slug, [
      'title',
      'date',
      'slug',
      'author',
      'content',
      'ogImage',
      'coverImage',
    ])
    const content = await markdownToHtml(markdownFilePost.content || '')

    const markdownFilePostAsHtml = {
      ...markdownFilePost,
      content,
    }
    post = markdownFilePostAsHtml
  }

  return { props: { post } }
}

export async function getStaticPaths() {
  const allMarkdownFilePosts = getAllMarkdownFilePosts(['slug'])

  const allGhostPosts = (await getAllGhostPosts()) || []

  const posts = [...allMarkdownFilePosts, ...allGhostPosts]

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      }
    }),
    fallback: false,
  }
}

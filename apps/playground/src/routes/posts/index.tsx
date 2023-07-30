import ky from 'ky'
import { ReactNode } from 'react'
import { NavLink, Outlet, useLoaderData } from 'react-router-dom'

interface PostItem {
  userId: number
  id: number
  title: string
  body: string
}

export async function loader() {
  return ky.get('https://jsonplaceholder.typicode.com/posts').json<PostItem[]>()
}

export function Component() {
  const posts = useLoaderData() as Awaited<ReturnType<typeof loader>>
  return (
    <div className="flex">
      <PostsSidebar posts={posts} />
      <PostsContent>
        <Outlet />
      </PostsContent>
    </div>
  )
}

function PostsSidebar(props: { posts: PostItem[] }) {
  const { posts } = props
  return (
    <aside>
      <ul>
        {posts.map((post) => (
          <li key={post.id}><NavLink to={`${post.id}`}>{post.title}</NavLink></li>
        ))}
      </ul>
    </aside>
  )
}

function PostsContent(props: { children: ReactNode }) {
  return props.children
}

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
    <aside
      className="bg-gray-200 p-4 text-left max-w-sm overflow-y-auto"
      style={{ maxHeight: 'calc(100vh - 124px)' }}
    >
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-2">
            <NavLink to={`${post.id}`} className="font-bold">
              {post.title}
            </NavLink>
            <p>{post.body.substring(0, 50)}...</p>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function PostsContent(props: { children: ReactNode }) {
  return props.children
}

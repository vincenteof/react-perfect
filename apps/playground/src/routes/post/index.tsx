import ky from 'ky'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import invariant from 'tiny-invariant'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export async function loader(args: LoaderFunctionArgs) {
  const { postId } = args.params
  invariant(postId?.length, 'postId is missing')
  return ky
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .json<Post>()
}

export function Component() {
  const post = useLoaderData() as Awaited<ReturnType<typeof loader>>
  return (
    <div>
      <h3>{post.title}</h3>
    </div>
  )
}

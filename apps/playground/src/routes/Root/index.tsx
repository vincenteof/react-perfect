import { Outlet, useLoaderData } from 'react-router-dom'
import ky from 'ky'

interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export async function loader() {
  return ky.get('https://jsonplaceholder.typicode.com/users').json<User[]>()
}

export function Component() {
  const users = useLoaderData() as Awaited<ReturnType<typeof loader>>
  return (
    <div>
      <Header user={users[0]} />
      <Outlet />
      <Footer />
    </div>
  )
}

function Header(props: { user: User }) {
  const { user } = props
  return <header>{user.username}</header>
}

function Footer() {
  return <footer>2023 @vincenteof</footer>
}

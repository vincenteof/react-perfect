import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" lazy={() => import('./routes/root')}>
      <Route path="posts" lazy={() => import('./routes/posts')}>
        <Route path=":postId" lazy={() => import('./routes/post')} />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App

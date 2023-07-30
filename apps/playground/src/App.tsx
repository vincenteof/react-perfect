import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Root from './routes/Root'
import Dashboard from './routes/Dashboard'
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App

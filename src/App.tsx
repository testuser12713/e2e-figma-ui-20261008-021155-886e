import { Outlet } from 'react-router-dom'
import AppNav from './components/AppNav'

export default function App() {
  return (
    <div className="app-shell">
      <AppNav />
      <main className="app-content">
        <div className="app-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

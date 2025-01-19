import { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'

export const reactRender = (component: ReactNode) => {
  return ReactDOM.createRoot(document.getElementById('root')!).render(component)
}

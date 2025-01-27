import { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'

export const reactRender = (component: ReactNode) => {
  return ReactDOM.createRoot(document.getElementById('root')!).render(component)
}

export const fromBytesToString = (bytes: number[]): string => {
  return new TextDecoder().decode(new Uint8Array(bytes))
}

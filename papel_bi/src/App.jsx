
import { useTheme } from '@emotion/react'
import './App.css'


function App() {
  const tema = useTheme()

  return (
    <>
      <div style={{backgroundColor: tema.palette.common.arcRed}}>Hello World</div>
    </>
  )
}

export default App

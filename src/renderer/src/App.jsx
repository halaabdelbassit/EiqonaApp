import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import HelloPage from './components/helloPage'
import Login from './components/Login'


function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      {/* <Versions></Versions> */}
      {/* <HelloPage></HelloPage> */}
      <Login></Login>
    </>
  )
}

export default App


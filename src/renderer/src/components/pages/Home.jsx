import Cookies from 'js-cookie'

function Home() {

  console.log('Home Page', Cookies.get('session'))
  return (
    <div>
      <h1 className="text-center font-bold text-3xl">Home Page</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Simulate Login</button>
    </div>
  )
}

export default Home

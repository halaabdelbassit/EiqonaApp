function Home() {
  console.log('Home Page', window.api)

  return (
    <div>
      <h1 className="text-center font-bold text-3xl">Home Page</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Simulate Login</button>
    </div>
  )
}

export default Home

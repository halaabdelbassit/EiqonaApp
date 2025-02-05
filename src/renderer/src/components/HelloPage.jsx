import HelloImg from '../images/hello_img.png'

function HelloPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img className='max-w-full h-auto' src={HelloImg} alt="brand image" />
    </div>
  )
}

export default HelloPage

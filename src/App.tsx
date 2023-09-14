import { useEffect, useRef, useState } from 'react'

function App() {
  const [percentage, setPercentage] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    imageRef.current!.animate(
      { transform: `translate(0, -${percentage}%)` },
      { duration: 1200, fill: 'forwards' }
    )
  }, [percentage])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    const position = window.scrollY
    console.log('position: ', position)
    const screenHight = window.innerHeight
    console.log('screenHight: ', screenHight)
    const scrollPercentage = (position / screenHight) * 100
    setPercentage(scrollPercentage)
  }

  return (
    <main className='h-[400vh] bg-black w-full flex gap-8'>
      <div className='h-screen w-1/2 relative block overflow-hidden'>
        <img
          src='https://images.unsplash.com/photo-1694161097603-2858ec0107fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1998&q=80'
          alt=''
          className='w-full object-cover h-[200%] '
          ref={imageRef}
        />
      </div>
      <div className='grow flex justify-center items-center flex-col text-white h-screen'>
        <div>{percentage}</div>
        <button onClick={() => setPercentage(percentage + 5)}>+</button>
      </div>
    </main>
  )
}

export default App

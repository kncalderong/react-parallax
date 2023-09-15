import { useEffect, useRef, useState } from 'react'
import ParallaxPerspective from './components/ParallaxPerspective'
import ParallaxDuplicateLenis from './components/ParallaxDuplicateLenis'

function App() {
  const [percentage, setPercentage] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)
  const sizeRadioImage = 1.4

  //to test unmount of lenis
  const [toggleParallaxWithLenis, setToggleParallaxWithLenis] = useState(false)

  //to handle animation
  useEffect(() => {
    imageRef.current!.animate(
      { transform: `translate(0, ${Math.round(percentage) * -1}%)` },
      { duration: 1200, fill: 'forwards' }
    )
  }, [percentage])

  //to observe scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const screenHight = window.innerHeight

      const percentageVisible = screenHight / imageRef.current!.height
      const percentageToTranslate = 1 - percentageVisible

      const scrollPercentage = (position / screenHight) * 100

      setPercentage((scrollPercentage - 100) * percentageToTranslate) //this 100 is the position of the container relative to Y axis of the page.. this time I know is 100vh
      /* console.log(
        Math.round((scrollPercentage - 100) * percentageToTranslate) * -1
      ) */
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className='min-h-[300vh] bg-black w-full flex flex-col'>
      <div className='h-screen'></div>
      <div className='flex gap-8'>
        <div className='relative block w-1/2 h-screen overflow-hidden'>
          <img
            src='https://images.unsplash.com/photo-1694161097603-2858ec0107fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1998&q=80'
            alt=''
            className={`w-full object-cover h-[${100 * sizeRadioImage}%] `}
            ref={imageRef}
          />
        </div>
        <div className='flex flex-col items-center justify-center h-screen text-white grow'>
          <div>{percentage}</div>
          <button onClick={() => setPercentage(percentage + 5)}>+</button>
          <button
            onClick={() => setToggleParallaxWithLenis(!toggleParallaxWithLenis)}
          >
            Unmount Lenis
          </button>
        </div>
      </div>
      <div className='h-screen'></div>
      {toggleParallaxWithLenis && (
        <div className='h-screen wrapper'>
          <ParallaxPerspective />
        </div>
      )}

      <div className='h-screen'></div>
      <div className='h-screen wrapper'>
        <ParallaxDuplicateLenis />
      </div>
    </main>
  )
}

export default App

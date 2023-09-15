import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const ParallaxPerspective = () => {
  const gsapLenisContainerSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)

    const updateScroll = (time: number) => {
      console.log('time')
      lenis.raf(time * 1000)
    }

    const ctx = gsap.context(() => {
      gsap.ticker.add(updateScroll)

      gsap.ticker.lagSmoothing(0)

      gsap.to('.card-image', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: '.card',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, gsapLenisContainerSectionRef)
    return () => {
      console.log('unmounting lenis')
      ctx.revert()
      lenis.destroy()
      gsap.ticker.remove(updateScroll)
    }
  }, [])

  return (
    <section className='flex h-screen' ref={gsapLenisContainerSectionRef}>
      <div className='relative block w-1/2 h-full overflow-hidden card'>
        <img
          className='card-image w-full h-[200%] object-cover absolute bottom-0 left-0'
          src='https://images.unsplash.com/photo-1694687380719-520137750440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
      </div>
    </section>
  )
}

export default ParallaxPerspective

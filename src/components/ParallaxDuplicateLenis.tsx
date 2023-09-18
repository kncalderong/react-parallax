import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const ParallaxDuplicateLenis = () => {
  const gsapLenisContainerSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lenis = new Lenis()

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        console.log('time')

        lenis.raf(time * 1000)
      })

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
    return () => ctx.revert()
  }, [])

  return (
    <section
      className='flex justify-end h-screen'
      ref={gsapLenisContainerSectionRef}
    >
      <div className='relative block w-1/2 h-full overflow-hidden card '>
        <img
          className='card-image w-full h-[200%] object-cover absolute bottom-0 left-0'
          src='https://images.unsplash.com/photo-1633424974356-0d2f050f9247?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
      </div>
    </section>
  )
}

export default ParallaxDuplicateLenis

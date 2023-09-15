import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const ParallaxPerspective = () => {
  const gsapLenisContainerSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      function raf(time: number) {
        lenis.raf(time)
        ScrollTrigger.update()
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

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

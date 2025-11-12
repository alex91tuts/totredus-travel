'use client'

import { useEffect } from 'react'

export default function GalleryInitializer() {
  useEffect(() => {
    // Store keyboard handler reference for cleanup
    let keyboardHandler: ((e: KeyboardEvent) => void) | null = null
    
    // Initialize all galleries on the page
    const initializeGalleries = () => {
      const galleries = document.querySelectorAll('[data-gallery-init]')
      
      galleries.forEach((gallery) => {
        if (gallery.hasAttribute('data-gallery-initialized')) return
        
        gallery.setAttribute('data-gallery-initialized', 'true')
        
        try {
          const imagesDataStr = gallery.getAttribute('data-images')
          if (!imagesDataStr) return
          
          const images = JSON.parse(imagesDataStr.replace(/&quot;/g, '"'))
          if (!Array.isArray(images) || images.length === 0) return
          
          let currentIndex = 0
          
          const openLightbox = (index: number) => {
            currentIndex = index
            createLightbox()
            document.body.style.overflow = 'hidden'
          }
          
          const closeLightbox = () => {
            const existingLightbox = document.getElementById('gallery-lightbox')
            if (existingLightbox) {
              existingLightbox.remove()
            }
            if (keyboardHandler) {
              window.removeEventListener('keydown', keyboardHandler)
              keyboardHandler = null
            }
            document.body.style.overflow = 'unset'
          }
          
          const goToNext = () => {
            currentIndex = (currentIndex + 1) % images.length
            updateLightboxImage()
          }
          
          const goToPrevious = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length
            updateLightboxImage()
          }
          
          const createLightbox = () => {
            // Remove existing lightbox if any
            const existing = document.getElementById('gallery-lightbox')
            if (existing) {
              existing.remove()
              if (keyboardHandler) {
                window.removeEventListener('keydown', keyboardHandler)
                keyboardHandler = null
              }
            }
            
            const lightbox = document.createElement('div')
            lightbox.id = 'gallery-lightbox'
            lightbox.className = 'fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4'
            lightbox.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; padding: 1rem;'
            
            // Store gallery context in lightbox for keyboard handler
            ;(lightbox as any).galleryContext = { 
              images, 
              getCurrentIndex: () => currentIndex, 
              setCurrentIndex: (idx: number) => { currentIndex = idx }, 
              updateLightboxImage,
              closeLightbox
            }
            
            // Close button
            const closeBtn = document.createElement('button')
            closeBtn.innerHTML = '&times;'
            closeBtn.className = 'absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 text-4xl font-light'
            closeBtn.style.cssText = 'position: absolute; top: 1rem; right: 1rem; color: white; font-size: 2rem; background: none; border: none; cursor: pointer; z-index: 10000; padding: 0.5rem;'
            closeBtn.onclick = (e) => {
              e.stopPropagation()
              closeLightbox()
            }
            
            // Previous button
            const prevBtn = document.createElement('button')
            prevBtn.innerHTML = '&#8249;'
            prevBtn.className = 'absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full'
            prevBtn.style.cssText = 'position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: white; background: rgba(0,0,0,0.5); border: none; cursor: pointer; z-index: 10000; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 2rem;'
            prevBtn.onclick = (e) => {
              e.stopPropagation()
              goToPrevious()
            }
            
            // Next button
            const nextBtn = document.createElement('button')
            nextBtn.innerHTML = '&#8250;'
            nextBtn.className = 'absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full'
            nextBtn.style.cssText = 'position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: white; background: rgba(0,0,0,0.5); border: none; cursor: pointer; z-index: 10000; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 2rem;'
            nextBtn.onclick = (e) => {
              e.stopPropagation()
              goToNext()
            }
            
            // Image container
            const imgContainer = document.createElement('div')
            imgContainer.style.cssText = 'position: relative; max-width: 100%; max-height: 90vh;'
            imgContainer.onclick = (e) => e.stopPropagation()
            
            const img = document.createElement('img')
            img.src = images[currentIndex].path
            img.alt = images[currentIndex].alt
            img.style.cssText = 'max-width: 100%; max-height: 90vh; object-fit: contain;'
            img.id = 'lightbox-image'
            
            // Counter
            const counter = document.createElement('div')
            counter.id = 'lightbox-counter'
            counter.textContent = `${currentIndex + 1} / ${images.length}`
            counter.style.cssText = 'position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%); color: white; font-size: 0.875rem; background: rgba(0,0,0,0.5); padding: 0.5rem 1rem; border-radius: 9999px; z-index: 10000;'
            
            imgContainer.appendChild(img)
            lightbox.appendChild(closeBtn)
            if (images.length > 1) {
              lightbox.appendChild(prevBtn)
              lightbox.appendChild(nextBtn)
            }
            lightbox.appendChild(imgContainer)
            lightbox.appendChild(counter)
            lightbox.onclick = closeLightbox
            
            document.body.appendChild(lightbox)
            
            // Keyboard navigation
            keyboardHandler = (e: KeyboardEvent) => {
              const lightboxEl = document.getElementById('gallery-lightbox') as any
              if (!lightboxEl || !lightboxEl.galleryContext) return
              
              const context = lightboxEl.galleryContext
              
              if (e.key === 'Escape') {
                context.closeLightbox()
              } else if (e.key === 'ArrowLeft') {
                const idx = context.getCurrentIndex()
                context.setCurrentIndex((idx - 1 + context.images.length) % context.images.length)
                context.updateLightboxImage()
              } else if (e.key === 'ArrowRight') {
                const idx = context.getCurrentIndex()
                context.setCurrentIndex((idx + 1) % context.images.length)
                context.updateLightboxImage()
              }
            }
            
            window.addEventListener('keydown', keyboardHandler)
          }
          
          const updateLightboxImage = () => {
            const img = document.getElementById('lightbox-image') as HTMLImageElement
            const counter = document.getElementById('lightbox-counter')
            if (img && images[currentIndex]) {
              img.src = images[currentIndex].path
              img.alt = images[currentIndex].alt
            }
            if (counter) {
              counter.textContent = `${currentIndex + 1} / ${images.length}`
            }
          }
          
          // Add click handlers to gallery images
          const galleryImages = gallery.querySelectorAll('.gallery-image')
          galleryImages.forEach((imgEl, index) => {
            imgEl.addEventListener('click', () => {
              const dataIndex = imgEl.getAttribute('data-index')
              const idx = dataIndex ? parseInt(dataIndex, 10) : index
              openLightbox(idx)
            })
          })
          
          // Handle "see more" button
          const seeMoreBtn = gallery.querySelector('.gallery-see-more-btn')
          if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', (e) => {
              e.stopPropagation()
              const moreSection = gallery.querySelector('.gallery-more')
              if (moreSection) {
                const visibleCountAttr = seeMoreBtn.getAttribute('data-visible-count')
                const initialVisibleCount = visibleCountAttr ? parseInt(visibleCountAttr, 10) : 6
                const moreImages = moreSection.querySelectorAll('.gallery-image')
                moreImages.forEach((imgEl, idx) => {
                  const actualIndex = initialVisibleCount + idx
                  imgEl.addEventListener('click', () => {
                    openLightbox(actualIndex)
                  })
                })
                ;(moreSection as HTMLElement).style.display = 'grid'
                ;(seeMoreBtn as HTMLElement).style.display = 'none'
              }
            })
          }
        } catch (error) {
          console.error('Error initializing gallery:', error)
        }
      })
    }
    
    // Initialize on mount
    initializeGalleries()
    
    // Also initialize after a short delay to catch dynamically added content
    const timeout = setTimeout(initializeGalleries, 100)
    
    return () => {
      clearTimeout(timeout)
      if (keyboardHandler) {
        window.removeEventListener('keydown', keyboardHandler)
      }
      // Clean up any existing lightbox
      const existingLightbox = document.getElementById('gallery-lightbox')
      if (existingLightbox) {
        existingLightbox.remove()
      }
      document.body.style.overflow = 'unset'
    }
  }, [])
  
  return null
}


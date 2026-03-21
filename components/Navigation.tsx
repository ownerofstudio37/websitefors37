'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Camera, ChevronDown } from '@/icons'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Phone } from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  order: number
  visible: boolean
  highlighted?: boolean
  children?: NavigationItem[]
}

export default function Navigation() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [dbLogoUrl, setDbLogoUrl] = useState<string | null>(null)
  const [navItems, setNavItems] = useState<NavigationItem[]>([])
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({})
  const [mobileDropdownStates, setMobileDropdownStates] = useState<Record<string, boolean>>({})
  // Small hover-intent close delays so menus don't vanish while moving cursor
  const dropdownCloseTimers = React.useRef<Record<string, ReturnType<typeof setTimeout> | null>>({})
  // Badge concept (light/dark) as default fallbacks
  const DEFAULT_LOGO_LIGHT = '/brand/studio37-badge-light.svg'
  const DEFAULT_LOGO_DARK = '/brand/studio37-badge-dark.svg'
  // User-requested default brand logo (Cloudinary) - optimized
  const DEFAULT_BRAND_LOGO = 'https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_200,c_limit/v1756077115/My%20Brand/IMG_2115_mtuowt.png'
  
  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    // Set initial scroll state without forced sync layout
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll as EventListener)
  }, [isMounted])

  // Fetch logo URL from settings once (client-side via Supabase)
  useEffect(() => {
    if (!isMounted) return
    let mounted = true
    ;(async () => {
      try {
        const { data, error } = await supabase.from('settings').select('logo_url, navigation_items').maybeSingle()
        
        if (error) {
          console.warn('[Navigation] Settings query error:', error.message)
          throw error
        }
        
        if (!mounted) return
        
        // Safe null checks for data
        if (data) {
          setDbLogoUrl(data.logo_url ? String(data.logo_url) : null)
          
          // Load navigation items with safe null check
          if (data.navigation_items && Array.isArray(data.navigation_items)) {
            const items = data.navigation_items as NavigationItem[]
            const visibleItems = items
              .filter(item => item.visible)
              .sort((a, b) => a.order - b.order)
            setNavItems(visibleItems)
          } else {
            // No navigation items in DB, use fallback
            throw new Error('No navigation_items found')
          }
        } else {
          // No settings row exists, use fallback
          throw new Error('No settings found')
        }
      } catch (err) {
        // Log error for debugging but don't crash - use fallback navigation
        console.warn('[Navigation] Using fallback navigation:', err instanceof Error ? err.message : 'Unknown error')
        if (mounted) {
          setDbLogoUrl(null)
          // Fallback to default navigation if DB fails
          setNavItems([
            { id: 'home', label: 'Home', href: '/', order: 1, visible: true },
            { id: 'gallery', label: 'Gallery', href: 'https://gallery.studio37.cc', order: 2, visible: true },
            {
              id: 'service-areas',
              label: 'Service Areas',
              href: '/locations',
              order: 3,
              visible: true,
              children: [
                { id: 'pinehurst', label: 'Pinehurst, TX', href: '/pinehurst', order: 1, visible: true },
                { id: 'woodlands', label: 'The Woodlands, TX', href: '/the-woodlands', order: 2, visible: true },
                { id: 'conroe', label: 'Conroe, TX', href: '/conroe', order: 3, visible: true },
                { id: 'magnolia', label: 'Magnolia, TX', href: '/magnolia', order: 4, visible: true },
                { id: 'huntsville', label: 'Huntsville, TX', href: '/huntsville', order: 5, visible: true },
              ],
            },
            {
              id: 'services',
              label: 'Services',
              href: '/services',
              order: 4,
              visible: true,
              children: [
                { id: 'services-wedding', label: 'Wedding Photography', href: '/services/wedding-photography', order: 1, visible: true },
                { id: 'services-portrait', label: 'Portrait Photography', href: '/services/portrait-photography', order: 2, visible: true },
                { id: 'services-event', label: 'Event Photography', href: '/services/event-photography', order: 3, visible: true },
                { id: 'services-commercial', label: 'Commercial Photography', href: '/services/commercial-photography', order: 4, visible: true },
                { id: 'services-branding-marketing', label: 'Branding & Marketing', href: '/services/branding-marketing', order: 5, visible: true },
              ],
            },
            { id: 'blog', label: 'Blog', href: '/blog', order: 5, visible: true },
            { id: 'about', label: 'About', href: '/about', order: 6, visible: true },
            { id: 'contact', label: 'Contact', href: '/contact', order: 7, visible: true },
            { id: 'book', label: 'Book Consultation', href: '/book-consultation', order: 8, visible: true, highlighted: true },
          ])
        }
      }
    })()
    return () => { mounted = false }
  }, [isMounted])

  // Derive which logo to show based on DB value and scroll state
  useEffect(() => {
    // Prefer DB-provided logo; else use brand default; else fallback badges
    if (dbLogoUrl) {
      setLogoUrl(dbLogoUrl)
    } else if (DEFAULT_BRAND_LOGO) {
      setLogoUrl(DEFAULT_BRAND_LOGO)
    } else {
      // Fallback to badge variants depending on scroll state for contrast
      setLogoUrl(scrolled ? DEFAULT_LOGO_LIGHT : DEFAULT_LOGO_DARK)
    }
  }, [dbLogoUrl, scrolled, DEFAULT_LOGO_LIGHT, DEFAULT_LOGO_DARK, DEFAULT_BRAND_LOGO])

  // Hide navigation on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Don't render navigation until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <nav 
      id="site-navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/88 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] border-b border-stone-200/80' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
      suppressHydrationWarning
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            aria-label="Studio 37 Photography - Home"
          >
            {logoUrl ? (
              <div className="flex items-center gap-2" suppressHydrationWarning>
                {/* Watermarked logo with responsive sizing */}
                <div className={`relative transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'} w-auto`} style={{ minWidth: scrolled ? 132 : 152 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={logoUrl} 
                    alt="Studio 37 Photography - Professional photography in Pinehurst, TX" 
                    width="140"
                    height="40"
                    className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-9' : 'h-11'}`}
                    loading="eager"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className={`rounded-full p-1 ${scrolled ? 'bg-amber-100' : 'bg-white/20'}`}>
                  <Camera 
                    className={`h-8 w-8 ${scrolled ? 'text-amber-700' : 'text-amber-200'}`} 
                    aria-hidden="true"
                  />
                </div>
                <span className={`text-xl font-serif font-bold ${scrolled ? 'text-amber-900' : 'text-white'}`}>
                  Studio 37
                </span>
              </>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-3 xl:gap-4" suppressHydrationWarning>
            {navItems.map((item) => {
              // Normalize hrefs to prevent duplicated segments like /services/services
              const normalizeHref = (href: string, parentHref?: string) => {
                try {
                  // Override gallery link to point to external subdomain
                  if (href === '/gallery' || href === 'gallery') {
                    return 'https://gallery.studio37.cc'
                  }
                  
                  // Leave absolute URLs alone
                  if (/^https?:\/\//i.test(href)) return href
                  // Trim spaces
                  let out = (href || '').trim()
                  // Ensure leading slash
                  if (!out.startsWith('/')) out = `/${out}`
                  // Collapse duplicate slashes
                  out = out.replace(/\/+/g, '/').replace(/\/+$/g, '')
                  // If parent provided, avoid repeating immediate segment (e.g., /services/services)
                  if (parentHref && parentHref !== '/' && out.startsWith(parentHref)) {
                    // Remove exact duplicated parent segment once, e.g., /services/services -> /services
                    const parts = out.split('/').filter(Boolean)
                    const dedup: string[] = []
                    for (const p of parts) {
                      if (dedup.length === 0 || dedup[dedup.length - 1] !== p) dedup.push(p)
                    }
                    out = '/' + dedup.join('/')
                  } else {
                    // Generic consecutive segment de-duplication
                    const parts = out.split('/').filter(Boolean)
                    const dedup: string[] = []
                    for (const p of parts) {
                      if (dedup.length === 0 || dedup[dedup.length - 1] !== p) dedup.push(p)
                    }
                    out = '/' + dedup.join('/')
                  }
                  return out || '/'
                } catch {
                  return href || '/'
                }
              }

              // Dropdown menu item
              if (item.children && item.children.length > 0) {
                const isDropdownOpen = dropdownStates[item.id] || false
                const isLargeDropdown = item.children.length > 8

                const handleEnter = () => {
                  // Cancel any pending close timer and open
                  const t = dropdownCloseTimers.current[item.id]
                  if (t) clearTimeout(t)
                  dropdownCloseTimers.current[item.id] = null
                  setDropdownStates(prev => ({ ...prev, [item.id]: true }))
                }

                const handleLeave = () => {
                  // Delay close slightly to allow cursor to traverse the gap
                  const t = setTimeout(() => {
                    setDropdownStates(prev => ({ ...prev, [item.id]: false }))
                    dropdownCloseTimers.current[item.id] = null
                  }, 180)
                  dropdownCloseTimers.current[item.id] = t
                }

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    <Link
                      href={normalizeHref(item.href)}
                      className={`transition-all font-medium px-3 py-2 rounded-full flex items-center gap-1 ${
                        scrolled ? 'text-stone-800 hover:text-amber-700 hover:bg-amber-50' : 'text-white hover:text-white hover:bg-white/10'
                      } focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      aria-label={`${item.label} menu`}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    
                    {isDropdownOpen && (
                      <div
                        className={`absolute top-full left-0 mt-3 bg-white rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.16)] border border-stone-200 z-50 overflow-hidden ${
                          isLargeDropdown ? 'w-[42rem] max-w-[90vw]' : 'w-56'
                        }`}
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        role="menu"
                        aria-label={`${item.label} submenu`}
                      >
                        <div
                          className={`p-2 overflow-y-auto overscroll-contain ${
                            isLargeDropdown
                              ? 'grid grid-cols-2 gap-1 max-h-[24rem]'
                              : 'max-h-[20rem]'
                          }`}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={normalizeHref(child.href, normalizeHref(item.href))}
                              className="block rounded-xl px-4 py-3 text-stone-800 hover:bg-amber-50 hover:text-amber-700 transition-colors leading-snug"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }
              
              // Regular link item
              return (
                <Link
                  key={item.id}
                  href={normalizeHref(item.href)}
                  className={`transition-all font-medium px-3 py-2 rounded-full ${
                    item.highlighted
                      ? scrolled
                        ? 'btn-primary'
                        : 'bg-amber-500 hover:bg-amber-400 text-white px-5 py-2.5 rounded-full shadow-lg'
                      : `hover:text-amber-700 hover:bg-amber-50 focus:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                          scrolled ? 'text-stone-800' : 'text-white hover:bg-white/10'
                        }`
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {/* Phone click-to-call */}
            <a
              href="tel:+18327139944"
              className={`hidden xl:flex items-center gap-2 font-medium transition-colors rounded-full px-3 py-2 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${
                scrolled ? 'text-stone-800 hover:bg-amber-50' : 'text-stone-100 hover:bg-white/10'
              }`}
              aria-label="Call Studio37 at (832) 713-9944"
            >
              <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span>(832) 713-9944</span>
            </a>
          </div>

          <button
            type="button"
            className={`md:hidden p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 ${scrolled ? 'text-stone-900 bg-stone-100' : 'text-white bg-white/10 backdrop-blur-sm'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close main navigation' : 'Open main navigation'}
            title={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div 
            className="md:hidden py-4 pb-20 border-t border-stone-200 bg-white/98 backdrop-blur-xl overflow-y-auto max-h-[calc(100vh-80px)]" 
            id="mobile-menu"
          >
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => {
                const normalizeHref = (href: string, parentHref?: string) => {
                  try {
                    // Override gallery link to point to external subdomain (matches desktop behavior)
                    if (href === '/gallery' || href === 'gallery') {
                      return 'https://gallery.studio37.cc'
                    }
                    
                    if (/^https?:\/\//i.test(href)) return href
                    let out = (href || '').trim()
                    if (!out.startsWith('/')) out = `/${out}`
                    out = out.replace(/\/+/g, '/').replace(/\/+$/g, '')
                    if (parentHref && parentHref !== '/' && out.startsWith(parentHref)) {
                      const parts = out.split('/').filter(Boolean)
                      const dedup: string[] = []
                      for (const p of parts) {
                        if (dedup.length === 0 || dedup[dedup.length - 1] !== p) dedup.push(p)
                      }
                      out = '/' + dedup.join('/')
                    } else {
                      const parts = out.split('/').filter(Boolean)
                      const dedup: string[] = []
                      for (const p of parts) {
                        if (dedup.length === 0 || dedup[dedup.length - 1] !== p) dedup.push(p)
                      }
                      out = '/' + dedup.join('/')
                    }
                    return out || '/'
                  } catch {
                    return href || '/'
                  }
                }
                // Mobile dropdown menu item
                if (item.children && item.children.length > 0) {
                  const isMobileDropdownOpen = mobileDropdownStates[item.id] || false
                  const isLargeDropdown = item.children.length > 8
                  
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => setMobileDropdownStates(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className="w-full flex items-center justify-between text-left transition-colors font-medium text-stone-900 px-3 py-3 rounded-2xl hover:bg-amber-50 hover:text-amber-700 focus:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                        aria-expanded={isMobileDropdownOpen}
                        aria-label={`${item.label} submenu toggle`}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      
                      {isMobileDropdownOpen && (
                        <div
                          className={`pl-4 mt-2 overflow-y-auto overscroll-contain ${
                            isLargeDropdown ? 'max-h-80 pr-1' : 'space-y-2'
                          }`}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.id}
                              href={normalizeHref(child.href, normalizeHref(item.href))}
                              className="block transition-colors text-stone-800 px-4 py-3 rounded-xl hover:bg-amber-50 hover:text-amber-700 focus:bg-amber-50 focus:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 touch-target"
                              onClick={() => { setIsOpen(false); }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                
                // Regular mobile link
                return (
                  <Link
                    key={item.id}
                    href={normalizeHref(item.href)}
                    className={`transition-all font-medium text-stone-900 px-4 py-3 rounded-2xl touch-target ${
                      item.highlighted
                        ? 'btn-primary w-fit'
                        : 'hover:bg-amber-50 hover:text-amber-700 focus:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2'
                    }`}
                    onClick={() => { setIsOpen(false); }}
                  >
                    {item.label}
                  </Link>
                )
              })}
              {/* Phone click-to-call */}
              <a
                href="tel:+18327139944"
                className="flex items-center gap-2 font-medium text-stone-900 hover:text-amber-700 px-4 py-3 rounded-2xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                onClick={() => setIsOpen(false)}
                aria-label="Call Studio37 at (832) 713-9944"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (832) 713-9944
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

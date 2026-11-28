import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { COLORS } from '../constants/color'
import './App.css'
import work1 from '/images/our-work/work1.webp'
import work2 from '/images/our-work/work2.webp'
import work3 from '/images/our-work/work3.webp'

//services images
import service5 from '/images/services/services5.jpeg'
import service4 from '/images/services/services8.jpeg'
import service1 from '/images/services/services11.jpeg'
import service3 from '/images/services/services6.jpeg'
import service2 from '/images/services/service9.jpeg'
import service6 from '/images/services/services10.jpeg'






const projects = [
  {
    number: '01',
    category: 'Brand identity · Print',
    name: 'Good things grow here.',
    image: work1,
    alt: 'A thoughtfully arranged collection of printed notebooks and stationery',
    className: 'project-card--stationery',
  },
  {
    number: '02',
    category: 'Packaging · Art direction',
    name: 'A little more flavour.',
    image: work2,
    alt: 'Colorful beverage packaging arranged as a product campaign',
    className: 'project-card--packaging',
  },
  {
    number: '03',
    category: 'Campaign · Large format',
    name: 'Out there. Everywhere.',
    image: work3,
    alt: 'Colorful graphic design and printed campaign artwork',
    className: 'project-card--campaign',
  },
]

const brandSectors = [
  'Local businesses',
  'Retail & goods',
  'Hospitality',
  'Events & culture',
  'Corporate teams',
  'Community projects',
]

const carouselInterval = 6500

const services = [
  {
    number: '01',
    title: 'Custom Apparel & Textile Branding',
    description: 'T-shirts, polos, caps, uniforms and event shirts, personalised or branded for your team.',
    icon: '◉',
    image: service1,
    imageAlt: 'A crisp white T-shirt ready for custom printing',
  },
  {
    number: '02',
    title: 'Engraving & Personalisation',
    description: 'Engraved gifts, customised merchandise and personal touches made to last.',
    icon: '✧',
    image: service2,
    imageAlt: 'A collection of carefully arranged design objects and gifts',
  },
  {
    number: '03',
    title: 'Commercial & Digital Printing',
    description: 'Flyers, posters, brochures, stickers, business cards, invitations and more.',
    icon: '▤',
    image: service3,
    imageAlt: 'Printed notebooks and stationery arranged on a desk',
  },
  {
    number: '04',
    title: 'Packaging & Bag Branding',
    description: 'Custom paper, polythene and rubber bags, pouches, gift bags and packaging.',
    icon: '▱',
    image: service4,
    imageAlt: 'Colorful product packaging arranged for a brand display',
  },
  {
    number: '05',
    title: 'Corporate & Promotional Branding',
    description: 'Office, shop and vehicle branding, promotional materials and corporate merchandise.',
    icon: '↗',
    image: service5,
    imageAlt: 'Bright printed campaign graphics displayed together',
  },
  {
    number: '06',
    title: 'Custom Merchandise & Gifts',
    description: 'Branded mugs, notebooks, folders, corporate gifts and customised accessories.',
    icon: '✳',
    image: service6,
    imageAlt: 'Gift boxes wrapped and ready to be personalised',
  },
]

const teamMembers = [
  { number: '01', name: 'Emmanuel Amoafo', role: 'CEO', monogram: 'EA' },
  { number: '02', name: 'Abigail Opuku', monogram: 'AO' },
]

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="Cavakuz Studio home">
      <img className="brand-logo" src="/images/logo/cavakuz-log-black.png" alt="" />
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [carouselHovered, setCarouselHovered] = useState(false)
  const [carouselFocused, setCarouselFocused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const serviceListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const serviceList = serviceListRef.current
    if (!serviceList) return

    const items = serviceList.querySelectorAll<HTMLElement>('.service-item')
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    serviceList.classList.add('service-list--animated')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches)

    updateMotionPreference()
    motionPreference.addEventListener('change', updateMotionPreference)
    return () => motionPreference.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || carouselPaused || carouselHovered || carouselFocused) return

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveProjectIndex((currentIndex) => (currentIndex + 1) % projects.length)
      }
    }, carouselInterval)

    return () => window.clearInterval(intervalId)
  }, [activeProjectIndex, carouselFocused, carouselHovered, carouselPaused, prefersReducedMotion])

  return (
    <div
      className="site-shell"
      id="top"
      style={{ '--blue': COLORS.primary, '--coral': COLORS.secondary } as CSSProperties}
    >
      <div className="announcement-bar">
        <span>Good ideas deserve to be seen.</span>
        <a href="#contact">Let’s make something great <ArrowIcon diagonal /></a>
      </div>

      <header className="site-header">
        <BrandMark />
        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>Our team</a>
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
            Start a project <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> Good ideas. Made with intention.</p>
            <h1 id="hero-title">Your Potentials<br />are unlimited<span className="hero-period">.</span></h1>
            <div className="hero-bottomline">
              <p>We turn bright ideas into bold brands, beautiful print and things you can’t help but notice.</p>
              <a className="round-link" href="#work" aria-label="Explore our work"><ArrowIcon /></a>
            </div>
            <div className="hero-caption"><span>Creative studio & print house</span><span>Working everywhere</span></div>
          </div>

          <div className="hero-art" aria-label="A colorful arrangement of print and creative materials">
            <div className="hero-art-frame">
              <img
                className="hero-photo"
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85"
                alt="Vibrant abstract artwork in warm, expressive colors"
                fetchPriority="high"
              />
              <div className="hero-art-wash" />
              <div className="hero-art-label"><span>GOOD<br />IDEAS</span><span>GET<br />MADE.</span></div>
              <div className="hero-sticker"><span>DESIGN<br />PRINT<br />REPEAT</span><span className="sticker-star">✳</span></div>
              <span className="hero-art-index">KZ—001 / 2026</span>
            </div>
            <div className="hero-side-note">MADE WITH<br />INTENTION <span>↘</span></div>
            <div className="hero-orbit" aria-hidden="true"><span /></div>
          </div>
          <a className="scroll-cue" href="#work"><span /> Scroll to explore</a>
        </section>

        <section className="work-section section-pad" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> A closer look at our work</p>
              <h2 id="work-title">Selected<br /><span>projects.</span></h2>
            </div>
            <p className="section-intro">Thoughtful stationery, packaging that pops and graphics that get noticed — this is the kind of energy we bring to a brief.</p>
          </div>
          <div
            className="project-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            onMouseEnter={() => setCarouselHovered(true)}
            onMouseLeave={() => setCarouselHovered(false)}
            onFocusCapture={() => setCarouselFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setCarouselFocused(false)
              }
            }}
          >
            <div
              className="project-carousel-stage"
              aria-live={carouselPaused || carouselHovered || carouselFocused || prefersReducedMotion ? 'polite' : 'off'}
            >
              {projects.map((project, index) => index === activeProjectIndex && (
                <a
                  className={`project-card ${project.className}`}
                  href="#contact"
                  key={project.number}
                  aria-label={`Project ${index + 1} of ${projects.length}: ${project.name}. Contact us about your project.`}
                >
                  <div className="project-image-wrap">
                    <img src={project.image} alt={project.alt} />
                    <span className="project-number">{project.number} / 03</span>
                    <span className="project-arrow"><ArrowIcon diagonal /></span>
                  </div>
                  <div className="project-meta">
                    <span className="project-meta-index">SELECTED WORK — {project.number} / 03</span>
                    <span className="project-meta-category">{project.category}</span>
                    <h3 className="project-meta-title">{project.name}</h3>
                    <span className="project-meta-link">Let’s make something <ArrowIcon diagonal /></span>
                  </div>
                </a>
              ))}
            </div>
            <div className="project-carousel-controls">
              <div className="project-carousel-pagination" role="group" aria-label="Choose a featured project">
                {projects.map((project, index) => (
                  <button
                    className={`project-carousel-dot${index === activeProjectIndex ? ' is-active' : ''}`}
                    type="button"
                    key={project.number}
                    aria-label={`Show project ${index + 1}: ${project.name}`}
                    aria-current={index === activeProjectIndex ? 'true' : undefined}
                    onClick={() => setActiveProjectIndex(index)}
                  />
                ))}
                <span className="project-carousel-count" aria-hidden="true">
                  <strong>{String(activeProjectIndex + 1).padStart(2, '0')}</strong> / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <div className="project-carousel-actions">
                <button
                  className="project-carousel-toggle"
                  type="button"
                  aria-label={carouselPaused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'}
                  onClick={() => setCarouselPaused((paused) => !paused)}
                >
                  <span aria-hidden="true">{carouselPaused ? '▶' : 'Ⅱ'}</span>
                  {carouselPaused ? 'Play' : 'Pause'}
                </button>
                <button
                  className="project-carousel-arrow project-carousel-previous"
                  type="button"
                  aria-label="Previous project"
                  onClick={() => setActiveProjectIndex((currentIndex) => (currentIndex - 1 + projects.length) % projects.length)}
                >
                  <ArrowIcon />
                </button>
                <button
                  className="project-carousel-arrow"
                  type="button"
                  aria-label="Next project"
                  onClick={() => setActiveProjectIndex((currentIndex) => (currentIndex + 1) % projects.length)}
                >
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
          <a className="text-link" href="#contact">Have a project in mind? <span>Let’s talk <ArrowIcon diagonal /></span></a>
        </section>

        <section className="brand-showcase" aria-labelledby="brand-showcase-title">
          <div className="brand-showcase-heading section-pad">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> The brands we’re here for</p>
              <h2 id="brand-showcase-title">Good company.<br /><span>Big ideas.</span></h2>
            </div>
            <p>From local businesses and retail to hospitality, events and growing teams, we make the things that help a brand show up in the real world.</p>
          </div>
          <div className="brand-showcase-rail" role="img" aria-label="Showcase of independent businesses, retail, hospitality, events and corporate teams">
            <div className="brand-showcase-track" aria-hidden="true">
              {Array.from({ length: 2 }, (_, setIndex) => (
                <div className="brand-showcase-set" key={setIndex}>
                  {brandSectors.map((sector, index) => (
                    <article className={`brand-sector-card brand-sector-card--${index + 1}`} key={sector}>
                      <span className="brand-sector-index">{String(index + 1).padStart(2, '0')} — MADE TO STAND OUT</span>
                      <span className="brand-sector-name">{sector}</span>
                      <span className="brand-sector-symbol">✳</span>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="brand-showcase-footer section-pad">
            <span>YOUR BRAND COULD BE NEXT</span>
            <a href="#contact">Let’s make your mark <ArrowIcon diagonal /></a>
          </div>
        </section>

        <section className="marquee-band" aria-label="Ideas made real">
          <div className="marquee-track" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <span className="marquee-set" key={index}>IDEAS MADE REAL <span>✳</span> PRINTED WITH PURPOSE <span>✳</span> BUILT TO BE SEEN <span>✳</span></span>
            ))}
          </div>
        </section>

        <section className="services-section section-pad" id="services" aria-labelledby="services-title">
          <div className="services-heading">
            <div className="services-heading-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> What we bring to the table</p>
              <h2 id="services-title">One good idea.<br /><span>Everywhere it needs to be.</span></h2>
            </div>
            <p>From the first spark to the final delivery, we make brands look and feel like themselves — only louder.</p>
          </div>
          <div className="service-list" ref={serviceListRef}>
            {services.map((service) => (
              <a
                className="service-item"
                href="#contact"
                key={service.number}
                style={{ '--service-order': Number(service.number) - 1 } as CSSProperties}
              >
                <span className="service-image">
                  <img src={service.image} alt={service.imageAlt} loading="lazy" />
                  <span className="service-number">{service.number} <span>/ 06</span></span>
                  <span className="service-image-icon" aria-hidden="true">{service.icon}</span>
                </span>
                <span className="service-card-copy">
                  <span className="service-copy"><strong>{service.title}</strong><span>{service.description}</span></span>
                  <span className="service-arrow"><ArrowIcon diagonal /></span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="manifesto" id="about" aria-labelledby="manifesto-title">
          <div className="manifesto-art" aria-hidden="true">
            <div className="manifesto-disc"><span>GOOD<br />STUFF<br />HAPPENS<br />HERE</span><i>✳</i></div>
            <span className="manifesto-stamp">EST. WITH<br />BIG IDEAS</span>
          </div>
          <div className="manifesto-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Nice to meet you</p>
            <h2 id="manifesto-title">We’re the<br />people behind<br /><span>the good stuff.</span></h2>
            <p>We’re a curious crew of designers, makers and print people who believe the world needs more thoughtful things — made with care, made to last, and made to mean something.</p>
            <a className="text-link" href="#contact"><span>More about Cavakuz <ArrowIcon diagonal /></span></a>
          </div>
        </section>

        <section className="team-section section-pad" id="team" aria-labelledby="team-title">
          <div className="team-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" /> The people behind the work</p>
              <h2 id="team-title">Meet the <span>team.</span></h2>
            </div>
            <p>Good ideas start with good people. Get to know the team bringing Cavakuz to life.</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <article className={`team-card team-card--${index === 0 ? 'emmanuel' : 'abigail'}`} key={member.name}>
                <div className="team-card-art" aria-hidden="true">
                  <span className="team-card-index">{member.number} / THE TEAM</span>
                  <span className="team-card-monogram">{member.monogram}</span>
                  <span className="team-card-stamp">CAVAKUZ<br />EMPIRE</span>
                </div>
                <div className="team-card-info">
                  <div>
                    <h3>{member.name}</h3>
                    {member.role && <p>{member.role}</p>}
                  </div>
                  <span className="team-card-arrow" aria-hidden="true"><ArrowIcon diagonal /></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-orbit contact-orbit--one" aria-hidden="true" />
          <div className="contact-orbit contact-orbit--two" aria-hidden="true" />
          <div className="contact-content">
            <div className="contact-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> Your next big thing starts here</p>
              <h2 id="contact-title">Let’s make<br />some <span>noise.</span></h2>
              <p className="contact-description">Have a project in mind? Tell us what you’re imagining and let’s make something people remember.</p>
              <a className="contact-email" href="mailto:cavakuzempire@gmail.com">cavakuzempire@gmail.com <ArrowIcon diagonal /></a>
              <a className="contact-email contact-phone" href="tel:+233206435353">Call +233 20 643 5353 <ArrowIcon diagonal /></a>
            </div>
            <form
              className="contact-form"
              action="mailto:cavakuzempire@gmail.com?subject=Cavakuz%20website%20enquiry"
              method="post"
              encType="text/plain"
            >
              <div className="contact-form-heading">
                <span>01 — YOUR PROJECT</span>
                <h3>Tell us a little about it.</h3>
              </div>
              <div className="contact-fields">
                <label>
                  Your name
                  <input autoComplete="name" name="name" placeholder="Name" required />
                </label>
                <label>
                  Email address
                  <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
                </label>
                <label className="contact-message-field">
                  What can we help with?
                  <textarea name="message" placeholder="Tell us a bit about your idea..." required rows={4} />
                </label>
              </div>
              <button className="contact-button" type="submit">Send your enquiry <ArrowIcon diagonal /></button>
              <p className="contact-form-note">Your email app will open to send your message.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><BrandMark /><span>Good work. Good people. Good energy.</span><a href="#top">Back to top ↑</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Cavakuz Empire. Made with intention.</span><span>Creative studio & print house · Obuasi, Gausu</span><a href="mailto:hello@cavakuz.com">hello@cavakuz.com</a></div>
      </footer>
    </div>
  )
}

export default App
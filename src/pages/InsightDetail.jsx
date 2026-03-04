import { useEffect, useState, useRef } from 'react'
import { Link } from 'wouter'
import { motion, useScroll } from 'framer-motion'
import { insights } from '../data/content'

function ContentBlock({ block }) {
  const styles = {
    h2: {
      fontFamily: 'Cormorant Garamond, Georgia, serif',
      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
      color: '#1a1f2e',
      fontWeight: 500,
      lineHeight: 1.25,
      marginTop: '2.5rem',
      marginBottom: '1rem',
    },
    h3: {
      fontFamily: 'Cormorant Garamond, Georgia, serif',
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      color: '#c8a96e',
      fontWeight: 500,
      fontStyle: 'italic',
      lineHeight: 1.3,
      marginTop: '1.75rem',
      marginBottom: '0.75rem',
    },
    p: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.0625rem',
      color: '#374151',
      lineHeight: 1.85,
      fontWeight: 300,
      marginBottom: '1.25rem',
    },
  }

  const Tag = block.type
  return <Tag style={styles[block.type] || styles.p}>{block.text}</Tag>
}

export default function InsightDetail({ slug }) {
  const article = insights.find((a) => a.slug === slug)
  const articleRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: articleRef })
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => setProgressWidth(v * 100))
    return unsubscribe
  }, [scrollYProgress])

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#f8f6f1' }}>
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1a1f2e' }}>
            Article not found
          </h1>
          <Link href="/insights">
            <a style={{ color: '#c8a96e', fontFamily: 'Inter, sans-serif', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Back to Insights
            </a>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: '#f8f6f1' }} ref={articleRef}>
      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${progressWidth}%` }}
      />

      {/* Hero header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ background: '#080d1a' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 mb-8">
              <Link href="/">
                <a
                  style={{ color: 'rgba(200,169,110,0.55)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', textDecoration: 'none', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c8a96e'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(200,169,110,0.55)'}
                >
                  Portfolio
                </a>
              </Link>
              <span style={{ color: 'rgba(200,169,110,0.3)' }}>/</span>
              <Link href="/insights">
                <a
                  style={{ color: 'rgba(200,169,110,0.55)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', textDecoration: 'none', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c8a96e'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(200,169,110,0.55)'}
                >
                  Insights
                </a>
              </Link>
              <span style={{ color: 'rgba(200,169,110,0.3)' }}>/</span>
              <span style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {article.category}
              </span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(200,169,110,0.12)', color: '#c8a96e', fontFamily: 'Inter, sans-serif', border: '1px solid rgba(200,169,110,0.25)' }}
              >
                {article.category}
              </span>
              <span style={{ color: 'rgba(232,228,220,0.4)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                {article.date}
              </span>
              <span style={{ color: 'rgba(232,228,220,0.4)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                · {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display font-light leading-tight mb-5"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#e8e4dc',
              }}
            >
              {article.fullTitle}
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl italic font-light"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: '#c8a96e',
              }}
            >
              {article.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-12 lg:gap-16">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Author byline */}
              <div
                className="flex items-center gap-4 mb-10 pb-10 border-b"
                style={{ borderColor: 'rgba(200,169,110,0.2)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-mono font-medium shrink-0"
                  style={{ background: 'linear-gradient(135deg, #c8a96e, #b89248)', color: '#080d1a' }}
                >
                  FA
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: '#1a1f2e', fontFamily: 'Inter, sans-serif' }}>
                    Faisal Alsadhan
                  </div>
                  <div className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>
                    Director of Partnerships & Strategic Alliances
                  </div>
                </div>
              </div>

              {/* Content blocks */}
              <div>
                {article.content.map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.04, duration: 0.55 }}
                  >
                    <ContentBlock block={block} />
                  </motion.div>
                ))}
              </div>

              {/* Footer actions */}
              <div
                className="flex flex-wrap items-center justify-between gap-6 mt-14 pt-10 border-t"
                style={{ borderColor: 'rgba(200,169,110,0.2)' }}
              >
                <Link href="/insights">
                  <a
                    className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                    style={{ color: '#c8a96e', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12 7H2M5 4L2 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Insights
                  </a>
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Inter, sans-serif' }}>
                    Share:
                  </span>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      background: 'rgba(200,169,110,0.08)',
                      color: '#c8a96e',
                      border: '1px solid rgba(200,169,110,0.2)',
                      fontFamily: 'Inter, sans-serif',
                      textDecoration: 'none',
                    }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="sticky top-28 flex flex-col gap-6">
                {/* About author */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(200,169,110,0.2)' }}
                >
                  <div className="text-xs font-medium tracking-widest uppercase mb-4"
                    style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
                    About the Author
                  </div>
                  <p className="text-xs leading-relaxed mb-4"
                    style={{ color: '#4a5568', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    Director of Partnerships & Strategic Alliances with 10+ years driving growth across telecom, fintech, and emerging tech.
                  </p>
                  <Link href="/">
                    <a
                      className="text-xs font-medium"
                      style={{ color: '#c8a96e', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}
                    >
                      View portfolio →
                    </a>
                  </Link>
                </div>

                {/* More articles */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(200,169,110,0.2)' }}
                >
                  <div className="text-xs font-medium tracking-widest uppercase mb-4"
                    style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
                    More Insights
                  </div>
                  <div className="flex flex-col gap-3">
                    {insights
                      .filter((a) => a.slug !== slug)
                      .map((a) => (
                        <Link key={a.id} href={`/insights/${a.slug}`}>
                          <a
                            className="block text-xs leading-relaxed transition-colors duration-200"
                            style={{ color: '#4a5568', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#c8a96e'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#4a5568'}
                          >
                            {a.title} →
                          </a>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  )
}

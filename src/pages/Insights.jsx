import { Link } from 'wouter'
import { motion } from 'framer-motion'
import { insights } from '../data/content'

function ArticleCard({ article, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/insights/${article.slug}`}>
        <a className="block" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="rounded-2xl overflow-hidden border transition-all duration-400"
            style={{
              background: '#ffffff',
              borderColor: 'rgba(26,31,46,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(200,169,110,0.12), 0 4px 12px rgba(0,0,0,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(26,31,46,0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Card header stripe */}
            <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #c8a96e, #b89248)' }} />

            <div className="p-8 lg:p-10">
              {/* Meta */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(200,169,110,0.1)',
                    color: '#9a7530',
                    fontFamily: 'Inter, sans-serif',
                    border: '1px solid rgba(200,169,110,0.2)',
                  }}
                >
                  {article.category}
                </span>
                <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace' }}>
                  {article.date}
                </span>
                <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace' }}>
                  · {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-display font-medium leading-tight mb-3 transition-colors duration-300"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: '#1a1f2e',
                }}
              >
                {article.fullTitle}
              </h2>

              {/* Subtitle */}
              <p
                className="text-base italic mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  color: '#c8a96e',
                  fontWeight: 300,
                }}
              >
                {article.subtitle}
              </p>

              {/* Excerpt */}
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: '#4a5568', fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {article.excerpt}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: '#c8a96e', fontFamily: 'Inter, sans-serif' }}
                >
                  Read article
                </span>
                <motion.svg
                  className="group-hover:translate-x-1 transition-transform duration-200"
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </div>
            </div>
          </motion.div>
        </a>
      </Link>
    </motion.article>
  )
}

export default function Insights() {
  return (
    <main className="min-h-screen" style={{ background: '#f8f6f1' }}>
      {/* Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ background: '#080d1a' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Link href="/">
                <a className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                  style={{ color: 'rgba(200,169,110,0.6)', textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c8a96e'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(200,169,110,0.6)'}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 6H2M5 3L2 6l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Portfolio
                </a>
              </Link>
              <span style={{ color: 'rgba(200,169,110,0.3)' }}>/</span>
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: '#c8a96e', fontFamily: 'JetBrains Mono, monospace' }}>
                Insights
              </span>
            </div>

            <h1
              className="font-display font-light leading-tight mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#e8e4dc',
              }}
            >
              Strategic{' '}
              <span className="italic" style={{ color: '#c8a96e' }}>Insights</span>
            </h1>
            <p
              className="max-w-xl text-lg font-light leading-relaxed"
              style={{ color: 'rgba(232,228,220,0.55)', fontFamily: 'Inter, sans-serif' }}
            >
              Thought leadership on partnerships, business development, and emerging technology ecosystems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {insights.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

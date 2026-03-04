import { Router, useLocation, Route, Switch } from 'wouter'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './components/Navigation'
import BackToTop from './components/BackToTop'
import Home from './pages/Home'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

function PageWrapper({ children }) {
  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>
      {children}
    </motion.div>
  )
}

function App() {
  const [location] = useLocation()

  return (
    <Router base={import.meta.env.BASE_URL}>
    <div className="relative">
      <Navigation />
      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/">
            <PageWrapper><Home /></PageWrapper>
          </Route>
          <Route path="/insights">
            <PageWrapper><Insights /></PageWrapper>
          </Route>
          <Route path="/insights/:slug">
            {(params) => (
              <PageWrapper><InsightDetail slug={params.slug} /></PageWrapper>
            )}
          </Route>
        </Switch>
      </AnimatePresence>
      <BackToTop />
    </div>
    </Router>
  )
}

export default App

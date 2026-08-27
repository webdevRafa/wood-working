import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { SiteLayout } from './components/SiteChrome'

const GuidePage = lazy(() => import('./pages/GuidePage').then((module) => ({ default: module.GuidePage })))
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })))
const HubPage = lazy(() => import('./pages/HubPage').then((module) => ({ default: module.HubPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const PlansPage = lazy(() => import('./pages/PlansPage').then((module) => ({ default: module.PlansPage })))
const SavedPage = lazy(() => import('./pages/SavedPage').then((module) => ({ default: module.SavedPage })))
const SearchPage = lazy(() => import('./pages/SearchPage').then((module) => ({ default: module.SearchPage })))
const ShopPage = lazy(() => import('./pages/ShopPage').then((module) => ({ default: module.ShopPage })))
const StartHerePage = lazy(() => import('./pages/StartHerePage').then((module) => ({ default: module.StartHerePage })))
const StaticPage = lazy(() => import('./pages/StaticPage').then((module) => ({ default: module.StaticPage })))

function App() {
  return (
    <Suspense fallback={<main className="mx-auto min-h-[60vh] max-w-3xl px-5 py-24 text-center"><p className="section-label">Opening the workshop</p><h1 className="mt-4 font-display text-4xl font-black text-walnut">Loading the next useful page…</h1></main>}>
      <Routes>
        <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="start-here" element={<StartHerePage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="projects" element={<HubPage eyebrow="Make something useful" title="Projects" description="Source-backed project plans organized around realistic difficulty, coherent dimensions, tool paths, cut lists, and safer checkpoints." types={['project']} />} />
        <Route path="projects/:slug" element={<GuidePage />} />

        <Route path="skills" element={<HubPage eyebrow="Build your judgment" title="Skills" description="Plain-language lessons for measuring, cutting, joinery, sanding, finishing, and solving the problem in front of you." types={['skill', 'troubleshooting']} />} />
        <Route path="skills/:slug" element={<GuidePage />} />

        <Route path="tools" element={<HubPage eyebrow="Buy with a reason" title="Tool decisions" description="Comparisons and buying guides organized around your project, shop constraints, ownership cost, and the reasons to keep what you already own." types={['review', 'comparison']} />} />
        <Route path="tools/:slug" element={<GuidePage />} />

        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:slug" element={<GuidePage />} />

        <Route path="materials" element={<HubPage eyebrow="Know what you are cutting" title="Materials & finishes" description="Lumber, sheet goods, adhesives, abrasives, stains, and finishes explained through the decisions that change a build." types={['material']} />} />
        <Route path="materials/:slug" element={<GuidePage />} />

        <Route path="plans" element={<PlansPage />} />
        <Route path="plans/:category" element={<PlansPage />} />

        <Route path="about" element={<StaticPage pageKey="about" />} />
        <Route path="about/testing-method" element={<StaticPage pageKey="testing" />} />
        <Route path="about/editorial-policy" element={<StaticPage pageKey="editorial" />} />
        <Route path="affiliate-disclosure" element={<StaticPage pageKey="disclosure" />} />
        <Route path="corrections" element={<StaticPage pageKey="corrections" />} />
        <Route path="privacy" element={<StaticPage pageKey="privacy" />} />
        <Route path="terms" element={<StaticPage pageKey="terms" />} />
        <Route path="accessibility" element={<StaticPage pageKey="accessibility" />} />
        <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

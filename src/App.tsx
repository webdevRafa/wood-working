import { Route, Routes } from 'react-router'
import { SiteLayout } from './components/SiteChrome'
import { GuidePage } from './pages/GuidePage'
import { HomePage } from './pages/HomePage'
import { HubPage } from './pages/HubPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SavedPage } from './pages/SavedPage'
import { StartHerePage } from './pages/StartHerePage'
import { StaticPage } from './pages/StaticPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="start-here" element={<StartHerePage />} />
        <Route path="saved" element={<SavedPage />} />

        <Route path="projects" element={<HubPage eyebrow="Make something useful" title="Projects" description="Measured builds with realistic difficulty, minimum-tool paths, cut lists, and recovery notes for the mistakes that happen in real shops." types={['project']} />} />
        <Route path="projects/:slug" element={<GuidePage />} />

        <Route path="skills" element={<HubPage eyebrow="Build your judgment" title="Skills" description="Plain-language lessons for measuring, cutting, joinery, sanding, finishing, and solving the problem in front of you." types={['skill', 'troubleshooting']} />} />
        <Route path="skills/:slug" element={<GuidePage />} />

        <Route path="tools" element={<HubPage eyebrow="Buy with a reason" title="Tool decisions" description="Comparisons and buying guides organized around your project, shop constraints, ownership cost, and the reasons to keep what you already own." types={['review', 'comparison']} />} />
        <Route path="tools/:slug" element={<GuidePage />} />

        <Route path="shop" element={<HubPage eyebrow="Make the space work" title="Shop setup" description="Workbenches, storage, workflow, dust collection, lighting, and machine choices for shops that still need to function as garages." types={['shop']} categoryIds={['beginner-foundations', 'stationary-tools']} />} />
        <Route path="shop/:slug" element={<GuidePage />} />

        <Route path="materials" element={<HubPage eyebrow="Know what you are cutting" title="Materials & finishes" description="Lumber, sheet goods, adhesives, abrasives, stains, and finishes explained through the decisions that change a build." types={['material']} />} />
        <Route path="materials/:slug" element={<GuidePage />} />

        <Route path="plans" element={<HubPage eyebrow="Build from a clear plan" title="Plans" description="Project plans organized around starting dimensions, a concrete cut list, sensible material use, and a minimum-tool route." types={['project']} />} />

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
  )
}

export default App

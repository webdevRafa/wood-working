import { useEffect } from 'react'

export function usePageMeta(title: string, description: string, noindex = false) {
  useEffect(() => {
    document.title = title

    const ensureMeta = (selector: string, attribute: 'name' | 'property', key: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.append(tag)
      }
      return tag
    }

    const descriptionTag = ensureMeta('meta[name="description"]', 'name', 'description')
    descriptionTag.content = description

    const robotsTag = ensureMeta('meta[name="robots"]', 'name', 'robots')
    robotsTag.content = noindex ? 'noindex,follow' : 'index,follow'

    ensureMeta('meta[property="og:title"]', 'property', 'og:title').content = title
    ensureMeta('meta[property="og:description"]', 'property', 'og:description').content = description
    ensureMeta('meta[name="twitter:title"]', 'name', 'twitter:title').content = title
    ensureMeta('meta[name="twitter:description"]', 'name', 'twitter:description').content = description

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = canonicalUrl
    ensureMeta('meta[property="og:url"]', 'property', 'og:url').content = canonicalUrl
  }, [description, noindex, title])
}

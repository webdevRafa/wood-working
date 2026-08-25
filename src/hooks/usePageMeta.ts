import { useEffect } from 'react'

export function usePageMeta(title: string, description: string, noindex = false) {
  useEffect(() => {
    document.title = title

    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.name = 'description'
      document.head.append(descriptionTag)
    }
    descriptionTag.content = description

    let robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robotsTag) {
      robotsTag = document.createElement('meta')
      robotsTag.name = 'robots'
      document.head.append(robotsTag)
    }
    robotsTag.content = noindex ? 'noindex,follow' : 'index,follow'
  }, [description, noindex, title])
}

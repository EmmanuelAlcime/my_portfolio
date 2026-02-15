import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_ORIGIN = 'https://emmanuelalcime.github.io'
const SITE_PATH = '/my_portfolio'
const SITE_URL = `${SITE_ORIGIN}${SITE_PATH}/`
const OG_IMAGE = `${SITE_URL}og-image.png`

const defaultMeta = {
  title: 'Digital Resume & Portfolio',
  description: 'Full Stack Developer with 6+ years of experience building high-performance web and mobile applications. Specialized in React, Laravel, PHP, and Android development.',
}

export default function SEO({ title = defaultMeta.title, description = defaultMeta.description, image = OG_IMAGE } = {}) {
  const location = useLocation()
  const path = location.pathname || SITE_PATH
  const url = `${SITE_ORIGIN}${path}`
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Structured data - Person with social links */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Emmanuel Alcime',
          jobTitle: 'Software Engineer',
          url: SITE_URL,
          sameAs: [
            'https://www.linkedin.com/in/emmanuel-alcime-564178209/',
            'https://github.com/emmanuelal242',
          ],
          image: OG_IMAGE,
        })}
      </script>
    </Helmet>
  )
}

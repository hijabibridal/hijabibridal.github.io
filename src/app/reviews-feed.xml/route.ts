import productData from '@/data/bridal-products.json'
import reviewsData from '@/data/reviews.json'

// Google product reviews feed (XML), built from reviews.json each time the
// site is built. Address once deployed: https://hijabibridal.github.io/reviews-feed.xml
// Submit this address to Merchant Center once you have 50 or more reviews and
// Google has approved you for Product Ratings.
export const dynamic = 'force-static'

const SITE = 'https://hijabibridal.github.io'
const PUBLISHER_NAME = 'Halal Nails'

// Makes text safe to place inside XML.
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Turns "2026-11-20" (or another date) into the time format Google needs.
function toTimestamp(date: unknown): string | null {
  const text = String(date ?? '').trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return `${text}T12:00:00Z`
  const parsed = new Date(text)
  return isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

export async function GET() {
  const allReviews: any[] = ((reviewsData as any).reviews || []) as any[]
  const products: any[] = (productData as any).products || []
  const usedIds = new Set<string>()

  const reviewBlocks: string[] = []

  allReviews.forEach((r: any, index: number) => {
    if (!r) return
    const rating = Number(r.rating)
    const content = String(r.text ?? '').trim()
    const timestamp = toTimestamp(r.date)
    const product = products.find((p: any) => p.slug === r.productSlug)

    // Google needs a rating, the review text, a date and a known kit.
    // A review missing any of these is left out of the feed (it can still
    // show on the page).
    if (!product || !(rating >= 1 && rating <= 5) || !content || !timestamp) return

    // A permanent ID for each review. Use the "id" field in reviews.json.
    let reviewId = String(r.id ?? `${r.productSlug}-${r.date}-${index + 1}`).trim()
    while (usedIds.has(reviewId)) reviewId += '-x'
    usedIds.add(reviewId)

    const author = String(r.author ?? '').trim()
    const productUrl = `${SITE}/shop/product/${product.slug}`
    const collectionMethod = r.collectionMethod === 'unsolicited' ? 'unsolicited' : 'post_fulfillment'

    reviewBlocks.push(`    <review>
      <review_id>${esc(reviewId)}</review_id>
      <reviewer>
        <name${author ? '' : ' is_anonymous="true"'}>${esc(author || 'Anonymous')}</name>
      </reviewer>
      <review_timestamp>${timestamp}</review_timestamp>${r.title && String(r.title).trim() ? `
      <title>${esc(String(r.title).trim())}</title>` : ''}
      <content>${esc(content)}</content>
      <review_url type="group">${esc(productUrl)}</review_url>
      <ratings>
        <overall min="1" max="5">${rating}</overall>
      </ratings>
      <products>
        <product>
          <product_ids>
            <skus>
              <sku>${esc(product.slug)}</sku>
            </skus>
            <brands>
              <brand>${esc(PUBLISHER_NAME)}</brand>
            </brands>
          </product_ids>
          <product_name>${esc(product.name)}</product_name>
          <product_url>${esc(productUrl)}</product_url>
        </product>
      </products>
      <collection_method>${collectionMethod}</collection_method>
    </review>`)
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.google.com/shopping/reviews/schema/product/2.3/product_reviews.xsd">
  <version>2.3</version>
  <publisher>
    <name>${esc(PUBLISHER_NAME)}</name>
  </publisher>${reviewBlocks.length > 0 ? `
  <reviews>
${reviewBlocks.join('\n')}
  </reviews>` : ''}
</feed>
`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}

import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Link Test Page</h1>
      
      {/* Test Link #1 (Top Format) */}
      <section className="mb-8 p-4 border">
        <p className="mb-0">
          <Link 
            href="/blog/best-automatic-cat-feeder-with-customizations" 
            style={{ color: '#FFAC1C' }}
            className="hover:underline"
          >
            TEST Top Link Format
          </Link>
        </p>
      </section>

      {/* Test Link #2 (Bottom Format) */}
      <div className="p-4 border">
        <div style={{ margin: '1rem 0 !important' }}>
          <Link
            href="/blog/category/dog-feeders-treats/dog-food"
            style={{ 
              color: '#F59E0B !important',
              fontWeight: '500 !important',
              display: 'block !important'
            }}
            className="hover:underline"
          >
            TEST Bottom Link Format
          </Link>
        </div>
      </div>
    </div>
  )
}
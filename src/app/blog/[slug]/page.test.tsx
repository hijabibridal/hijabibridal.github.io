/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import BlogPostPage from './page'
import '@testing-library/jest-dom'

// Mock components
jest.mock('@/components/Breadcrumbs', () => () => <div data-testid="breadcrumbs" />)

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'test-article' }),
  notFound: jest.fn()
}))

// Mock data files
jest.mock('@/data/blog-articles.json', () => ({
  articles: [{
    slug: 'test-article',
    htmlBody: 'Content with <InternalLink id="existing-link" /> and <InternalLink id="missing-link" />',
    isPreformatted: false,
    pageTitle: 'Test Article',
    description: 'Test Description',
    featuredImageUrl: '/test.jpg',
    featuredImageAlt: 'Test Alt',
    mainCategorySlug: 'test-category',
    mainCategoryName: 'Test Category',
    subCategorySlug: 'test-subcategory',
    subCategoryName: 'Test Subcategory'
  }]
}))

jest.mock('@/data/internal-links.json', () => [
  {
    id: 'existing-link',
    text: 'Existing Link Text',
    url: '/existing-url'
  }
])

describe('BlogPostPage Link Integration', () => {
  it('correctly renders valid internal links', () => {
    render(<BlogPostPage />)
    
    const link = screen.getByText('Existing Link Text')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/existing-url')
    expect(link).toHaveClass('text-amber-600')
  })

  it('shows error for missing link IDs', () => {
    render(<BlogPostPage />)
    
    const error = screen.getByText(/Missing Link: missing-link/i)
    expect(error).toBeInTheDocument()
    expect(error).toHaveClass('bg-yellow-100')
  })

  it('preserves regular content', () => {
    render(<BlogPostPage />)
    expect(screen.getByText('Content with')).toBeInTheDocument()
  })
})
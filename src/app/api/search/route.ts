// src/app/api/search/route.ts
export const dynamic = "force-static";
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  
  try {
    // 1. Verify file path
    const filePath = path.join(process.cwd(), 'src', 'data', 'blog-articles.json');
    console.log(`Search API: Loading data from ${filePath}`);
    
    // 2. Check file exists
    try {
      await fs.access(filePath);
      console.log('Search API: File exists');
    } catch (err) {
      console.error('Search API: File not found', err);
      return NextResponse.json(
        { error: "Data file not found", path: filePath },
        { status: 404 }
      );
    }
    
    // 3. Read file
    const fileContents = await fs.readFile(filePath, 'utf8');
    console.log(`Search API: File read successfully (${fileContents.length} bytes)`);
    
    // 4. Parse JSON
    let rawData;
    try {
      rawData = JSON.parse(fileContents);
      console.log('Search API: JSON parsed successfully');
    } catch (parseError) {
      console.error('Search API: JSON parse error', parseError);
      return NextResponse.json(
        { error: "Invalid JSON format", message: parseError.message },
        { status: 500 }
      );
    }
    
    // 5. Extract articles from categories
    let allArticles: any[] = [];
    let totalArticles = 0;

    // Handle category-based structure
    if (rawData.mainCategories && Array.isArray(rawData.mainCategories)) {
      console.log(`Search API: Found ${rawData.mainCategories.length} categories`);
      
      // Properly extract articles from each category
      rawData.mainCategories.forEach((category: any) => {
        const articlesInCategory = 
          category.articles || 
          category.data?.articles;
        
        if (articlesInCategory && Array.isArray(articlesInCategory)) {
          allArticles = [...allArticles, ...articlesInCategory];
          totalArticles += articlesInCategory.length;
          console.log(`Search API: Added ${articlesInCategory.length} articles from category "${category.name}"`);
        } else {
          console.warn(`Search API: No articles found in category "${category.name}"`);
        }
      });
    }
    
    // Fallback: Try to find articles at top level
    if (totalArticles === 0) {
      if (rawData.articles && Array.isArray(rawData.articles)) {
        allArticles = rawData.articles;
        totalArticles = rawData.articles.length;
        console.log(`Search API: Using top-level articles array (${totalArticles} articles)`);
      } else {
        console.warn('Search API: No articles found in any category or top-level');
      }
    }

    console.log(`Search API: Processing ${totalArticles} articles`);
    
    if (!query) {
      console.log('Search API: Empty query - returning empty results');
      return NextResponse.json([]);
    }

    console.log(`Search API: Searching for "${query}"`);
    
    // Split query into individual keywords
    const queryKeywords = query.split(/\s+/).filter(Boolean);
    const totalKeywords = queryKeywords.length;
    
    // 6. Enhanced scoring system with keyword-based matching
    const results = allArticles
      .filter(article => {
        if (!article?.slug) {
          console.warn('Search API: Article missing slug', article);
          return false;
        }
        return true;
      })
      .map(article => {
        const title = (article.pageTitle || article.title || '').toLowerCase();
        const metaDesc = (article.metaDescription || '').toLowerCase();
        const description = (article.description || '').toLowerCase();
        const breadcrumbs = (article.mainCategoryName || article.mainCategory || '').toLowerCase();
        
        // Initialize scoring (0-100)
        let score = 0;
        
        // Track keyword matches
        let titleMatches = 0;
        let metaMatches = 0;
        let descMatches = 0;
        let breadcrumbMatches = 0;
        
        // 1. Check for exact phrase matches first (highest priority)
        if (title === query) {
          // Perfect match in title = instant 100%
          score = 100;
        } else if (metaDesc === query) {
          // Perfect meta match = max 90%
          score = 90;
        } else {
          // 2. Keyword-based matching for partial/out-of-order matches
          queryKeywords.forEach(keyword => {
            // Title matches
            if (title.includes(keyword)) {
              titleMatches++;
              // Position bonuses
              if (title.startsWith(keyword)) score += 8;
              else if (title.indexOf(keyword) < 15) score += 5;
            }
            
            // Meta description matches
            if (metaDesc.includes(keyword)) {
              metaMatches++;
              score += 4;
            }
            
            // Description matches
            if (description.includes(keyword)) {
              descMatches++;
              score += 3;
            }
            
            // Breadcrumb matches
            if (breadcrumbs.includes(keyword)) {
              breadcrumbMatches++;
              score += 6;
            }
          });
          
          // 3. Calculate density bonuses
          const titleDensity = titleMatches / totalKeywords;
          const metaDensity = metaMatches / totalKeywords;
          const descDensity = descMatches / totalKeywords;
          
          score += titleDensity * 30;
          score += metaDensity * 15;
          score += descDensity * 10;
          
          // 4. Full match bonuses
          if (titleMatches === totalKeywords) score += 25;
          if (metaMatches === totalKeywords) score += 15;
          if (descMatches === totalKeywords) score += 10;
        }
        
        // 5. Partial exact phrase matches (medium priority)
        if (score < 100) {
          if (title.includes(query)) {
            score = Math.max(score, 60);
            // Boost if match is near beginning
            if (title.indexOf(query) < 15) score += 10;
          }
          
          if (metaDesc.includes(query)) {
            score = Math.max(score, 30);
            // Boost for exact phrase match
            if (metaDesc.includes(` ${query} `)) score += 10;
          }
          
          if (description.includes(query)) {
            score = Math.max(score, 20);
            // Boost for multiple occurrences
            const count = (description.match(new RegExp(query, 'g')) || []).length;
            if (count > 1) score += Math.min(10, count * 2);
          }
        }
        
        // 6. Category matches
        if (article.mainCategoryName?.toLowerCase().includes(query)) {
          score += 15;
        }
        
        // 7. Freshness boost
        if (article.publishedDate) {
          const pubDate = new Date(article.publishedDate);
          const ageInMonths = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
          if (ageInMonths < 3) score += 15; // Very recent articles
        }
        
        // Ensure score is between 0-100 with perfect matches preserved
        score = Math.min(100, Math.max(0, score));
        
        // Guarantee perfect score for exact title matches
        if (title === query) score = 100;
        
        return {
          url: `/blog/${article.slug}`,
          title: article.pageTitle || article.title,
          // CHANGED: Prioritize main description over metaDescription
          description: article.description || article.metaDescription,
          breadcrumbs: article.mainCategoryName || article.mainCategory || '',
          score: Math.round(score)
        };
      })
      .filter(item => item.score > 0)
      // Sort by score descending
      .sort((a, b) => b.score - a.score);

    console.log(`Search API: Found ${results.length} matches`);
    
    // Return top 10 results
    return NextResponse.json(results.slice(0, 10));
    
  } catch (error) {
    console.error('Search API: Unexpected error', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
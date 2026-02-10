export function getKeywords(isDogArticle: boolean): string[] {
  const baseKeywords = [
    "pet supplies", 
    "automatic feeder",
    "pet gadgets",
    "smart pet devices"
  ];
  
  const dogKeywords = [
    "dog feeder", 
    "dog bowl",
    "dog toys",
    "dog health"
  ];

  const catKeywords = [
    "cat feeder",
    "cat fountain", 
    "cat toys",
    "cat health"
  ];

  return [
    ...baseKeywords,
    ...(isDogArticle ? dogKeywords : catKeywords),
    "pet food",
    "pet friendly",
    "best pet products"
  ];
}
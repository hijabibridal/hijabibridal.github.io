export default function amazonImageLoader({ src, width, quality }) {
  const url = new URL(src);
  
  // Amazon image URL pattern manipulation
  const pathParts = url.pathname.split('/');
  const filename = pathParts.pop();
  const filenameParts = filename.split('.');
  
  // Insert width specification before file extension
  const newFilename = [
    ...filenameParts.slice(0, -1),
    `_SL${width}_`,
    filenameParts[filenameParts.length - 1]
  ].join('');
  
  pathParts.push(newFilename);
  url.pathname = pathParts.join('/');
  
  // Add quality parameter
  url.searchParams.set('q', (quality || 75).toString());
  
  return url.href;
}
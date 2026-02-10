export const TypographyConfiguration = () => {
  return (
    <div className='mt-8'>
      <h4 className='text-xl font-semibold mb-4'>Typography Configuration</h4>
      <div className='mb-4 space-y-2'>
        <p>Base font size is responsive:</p>
        <ul className='list-disc pl-5'>
          <li>Mobile: 15px</li>
          <li>Small screens: 16px</li>
          <li>Medium screens: 17px</li>
        </ul>
        <p className='pt-2'>Article content uses 1.25rem (20px) with 1.75 line-height.</p>
      </div>
      <pre className='bg-gray-100 p-4 rounded-md overflow-x-auto text-sm dark:bg-gray-800'>
        {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        base: ['15px', { lineHeight: '1.6' }],
        sm: ['16px', { lineHeight: '1.6' }],
        md: ['17px', { lineHeight: '1.6' }],
      },
      // Default font families (example - adjust to your actual fonts)
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    }
  }
}`}
      </pre>
      <div className='mt-4 p-4 bg-yellow-50 rounded-md dark:bg-yellow-900/20'>
        <h5 className='font-medium mb-2'>Important Typography Notes:</h5>
        <ul className='list-disc pl-5 space-y-1'>
          <li>Article headings have specific sizes (h2: 1.875rem, h3: 1.5rem)</li>
          <li>Font size reduction utility (.font-size-reduced) scales all text</li>
          <li>Dark mode text colors are automatically handled</li>
        </ul>
      </div>
    </div>
  )
}
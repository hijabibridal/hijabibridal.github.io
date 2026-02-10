export const ColorConfiguration = () => {
  return (
    <div className='mt-6'>
      <h4 className='text-xl font-semibold mb-4'>Color Configuration</h4>
      <div className='flex gap-4 mb-4 flex-wrap'>
        <div className='w-20 h-20 bg-primary rounded-md flex items-center justify-center'>
          <span className='text-white text-xs text-center'>Primary<br/>#FFAC1C</span>
        </div>
        <div className='w-20 h-20 bg-primary-light rounded-md flex items-center justify-center'>
          <span className='text-white text-xs text-center'>Primary Light<br/>#FFC470</span>
        </div>
        <div className='w-20 h-20 bg-primary-dark rounded-md flex items-center justify-center'>
          <span className='text-white text-xs text-center'>Primary Dark<br/>#E59419</span>
        </div>
        <div className='w-20 h-20 bg-grey rounded-md flex items-center justify-center dark:bg-gray-200'>
          <span className='text-white text-xs text-center dark:text-gray-900'>Grey<br/>#363636</span>
        </div>
      </div>
      <pre className='bg-gray-100 p-4 rounded-md overflow-x-auto text-sm dark:bg-gray-800'>
        {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FFAC1C',
        'primary-light': '#FFC470',
        'primary-dark': '#E59419',
        grey: '#363636',
        // Dark mode colors are automatically handled
      }
    }
  }
}`}
      </pre>
    </div>
  )
}
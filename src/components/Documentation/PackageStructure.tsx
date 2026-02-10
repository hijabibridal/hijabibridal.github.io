export const PackageStructure = () => {
  return (
    <div className='mb-12'>
      <h2 className='text-2xl font-bold mb-6'>Package Structure</h2>
      <div className='bg-gray-100 p-4 rounded-md'>
        <pre>{`src/
├── app/               # Next.js app router
├── components/        # Reusable components
│   └── Documentation/ # Documentation components
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/            # Global styles`}</pre>
      </div>
      <p className='mt-4'>
        The main configuration files are located at the root: next.config.js, tailwind.config.js, and tsconfig.json.
      </p>
    </div>
  )
}
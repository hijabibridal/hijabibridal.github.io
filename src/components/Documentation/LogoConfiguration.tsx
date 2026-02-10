export const LogoConfiguration = () => {
  return (
    <div className='mt-8'>
      <h4 className='text-xl font-semibold mb-4'>Logo Configuration</h4>
      <p className='mb-4'>
        Replace the default logo by updating the logo path in the Header component.
      </p>
      <pre className='bg-gray-100 p-4 rounded-md overflow-x-auto text-sm'>
        {`// src/components/Header/Header.tsx
<Image 
  src="\images\Logo\pet-gadget-insider-logo.png"" 
  alt="Pet Gadget Insider Pet SUpplies" 
  width={120} 
  height={40}
/>`}
      </pre>
    </div>
  )
}
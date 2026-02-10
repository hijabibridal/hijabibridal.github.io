import { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Smart Pet Care FAQ | Pet Gadget Insider',
  description: 'Get answers about smart pet care supplies including automatic feeders, GPS trackers, and pet cameras',
}

const faqItems = [
  {
    question: "What exactly are smart pet supplies?",
    answer: "Smart pet supplies are technology-enhanced products that automate, monitor, or improve aspects of pet care through features like app connectivity, sensors, and automated functions. Smart pet supplies provide convenience for pet owners by streamlining daily tasks such as feeding, litter box cleaning, and activity tracking. These innovations not only enhance pets’ well-being but also offer peace of mind for owners through real-time data and remote control."
  },
  {
    question: "Are automatic feeders worth the investment?",
    answer: "Absolutely. Automatic feeders ensure consistent meal times and portion control, which is especially valuable for pets with special diets, busy owners, or multi-pet households. Automatic pet feeders also help prevent overfeeding by dispensing only the programmed amount, supporting healthier weight management. Some models can even be programmed remotely, adding flexibility and reassurance when owners are away."
  },
  {
    question: "How do smart pet fountains benefit my pet?",
    answer: "Dog fountains and cat fountains provide continuous filtered water flow, encouraging hydration while removing impurities. Some models even track water consumption to alert you to potential health issues. Others include UV sterilizers and smart alerts to ensure your pet’s drinking water remains clean, fresh, and safe at all times."
  },
  {
    question: "What should I look for in a pet feeder?",
    answer: "Key features of dog feeders and cat feeders include: reliable scheduling, portion control, battery backup, camera integration, and compatibility with your pet's food type (kibble size, wet food capability). Some advanced pet feeders even offer app-based analytics that track feeding patterns over time, helping pet parents make informed decisions about nutrition and routine."
  },
  {
    question: "Do self-cleaning litter boxes really work?",
    answer: "Yes! The models we've reviewed here automatically sift waste into a sealed compartment, reducing odor and maintenance. Some even feature health-monitoring capabilities, detecting changes in litter box habits that could signal underlying medical concerns early on. They're ideal for cats who prefer clean boxes and owners who want convenience."
  },
  {
    question: "How accurate are GPS pet trackers?",
    answer: "Modern trackers use GPS with cellular connectivity, providing real-time location updates accurate within 5-10 feet. They often include virtual fence features that send instant alerts if your pet strays outside designated boundaries. Some even monitor activity levels and behavior trends, helping you track overall health an fditness. They're perfect for adventurous pets."
  },
  {
    question: "Can pet cameras help with separation anxiety?",
    answer: "Definitely. Two-way audio lets you comfort your pet, while treat dispensers with cameras reinforce positive behavior. Some pet cameras barking alerts so you can check in when needed. Others offer night vision and motion detection, so you can keep an eye on your furry friend any time of day, even when you're not home."
  },
  {
    question: "What health metrics can smart collars track?",
    answer: "Advanced pet trackers monitor activity levels, sleep quality, calories burned, skin temperature, and even provide location history - great for spotting health changes early. They’re especially useful for senior pets or those with chronic conditions, offering actionable insights that can support early intervention and personalized care."
  },
  {
    question: "Are interactive cat toys and dog toys safe for unsupervised play?",
    answer: "Most pet toys are designed for safe independent use, but check for: sturdy construction, automatic shut-offs, and non-toxic materials. Always supervise initial play sessions. And don’t forget to rotate dog and cat toys regularly to keep your pet mentally stimulated and prevent boredom-induced mischief."
  },
  {
    question: "How do I choose between WiFi and Bluetooth pet care devices?",
    answer: "WiFi offers unlimited range but requires home network. Bluetooth works offline but has shorter range (30-100 ft). Consider your needs - WiFi for remote access, Bluetooth for home use. Some hybrid devices even combine both technologies, switching seamlessly between WiFi and Bluetooth to ensure continuous connectivity and control."
  },
  {
    question: "What's the battery life like on smart pet supplies?",
    answer: "Varies by device: Feeders/trackers typically last 2-6 months on batteries, while cameras usually need constant power. Look for low-power modes and rechargeable options. Some devices also feature battery health indicators and app notifications, so you’re never caught off guard by a sudden power loss."
  },
  {
    question: "Can smart pet feeders help with multiple pets?",
    answer: "Yes! Many feeders have microchip recognition, cameras distinguish between pets, and activity monitors can track individuals if each wears their own device. This level of personalization ensures that each pet gets the right amount of food, attention, and health insights tailored to their unique needs. Automatic pet feeders especially helpful in multi-pet households where routines and diets may vary widely between animals."
  },
  {
    question: "Are there smart solutions for pet medications?",
    answer: "Absolutely. Automated treat dispensers can schedule pills/treats, send reminders, and some even have cameras to confirm medication was taken properly."
  },
  {
    question: "How difficult are these smart app pet feeders to set up?",
    answer: "Most pet feeders feature simple app-guided setup. Basic tech literacy is sufficient - typically just connecting to WiFi and configuring settings through intuitive mobile apps. Some even offer voice-guided installation or quick-start video tutorials to walk users through each step. With user-friendly interfaces, getting started is usually a breeze."
  },
  {
    question: "What if the power goes out?",
    answer: "Quality pet feeders have battery backups (feeders typically 12-48 hours). For critical devices like feeders, consider models with cellular options. That way, even during WiFi outages or power interruptions, your pet’s feeding schedule remains uninterrupted and stress-free."
  },
  {
    question: "Do vets recommend smart pet supplies?",
    answer: "Many vets endorse smart pet supplies for: maintaining consistent routines, early health detection, and enabling remote monitoring between visits. Always consult your vet about specific needs. They can also facilitate more accurate vet consultations by providing objective data on your pet’s daily habits and health trends. As smart technology evolves, it's becoming an increasingly valuable extension of professional veterinary care."
  },
  {
    question: "How secure is the data from pet cameras?",
    answer: "Reputable pet camera brands use bank-grade encryption. Always enable two-factor authentication, use strong passwords and check privacy policies before purchasing."
  },
  {
    question: "Can pet feeders integrate with smart home systems?",
    answer: "Many work with Alexa/Google Home, allowing voice control and routines. Some even trigger actions - like turning on lights when your pet approaches their feeder. They can also be integrated into broader smart home ecosystems, syncing with cameras, thermostats, or even door locks for enhanced automation and security. This creates a seamless environment where your pet’s needs are woven into your home’s daily rhythm."
  },
  {
    question: "What's the best starter smart pet product?",
    answer: "We recommend beginning with a pet camera or automatic feeder - they address universal needs and provide immediate value without overwhelming complexity."
  },
  {
    question: "Where can I find reliable reviews of smart pet supplies?",
    answer: "Right here at Pet Gadget Insider! We use AI to review all products in an unbiased manner, and we maintain updated 'top picks' for every category based on real-world performance. This ensures pet owners can make informed decisions with confidence backed by reliable insights. As new models launch and older ones evolve, our rankings adapt to reflect the latest developments in smart pet care."
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs
        currentPage="FAQ"
        links={[
          { href: '/', text: 'Home' }
        ]}
      />
      
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Smart Pet Supplies FAQ</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your complete guide to tech-powered pet care solutions
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {item.question}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
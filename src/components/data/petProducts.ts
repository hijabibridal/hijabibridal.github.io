export interface ExpertProduct {
  profession: string;
  name: string;
  imgSrc: string;
  productLink: string;
  internalLink: string; // Added this new field
  price: string;
  features: string[];
}

export const ExpertData: ExpertProduct[] = [
  {
    profession: 'Automatic Cat Feeder',
    name: 'PETLIBRO',
    imgSrc: 'https://m.media-amazon.com/images/I/41IyqubT+HL._SL500_.jpg',
    internalLink: '/blog/best-automatic-cat-feeder-with-speaker-function', // Added internal link
    price: '$69.99',
    features: [
      "Smart APP Control: Wi-Fi enabled for remote feeding",
      "10 meals per day with 1-48 portions per meal",
      "10-second voice recording for meal calls",
      "5L capacity with freshness preservation"
    ]
  },
  {
    profession: 'Automatic Feeder',
    name: 'IMIPAW',
    imgSrc: 'https://m.media-amazon.com/images/I/31smh+Fyk0L._SL500_.jpg',
    internalLink: '/blog/best-automatic-cat-feeder-shallow-bowl-design', // Added internal link
    price: '$35.99',
    features: [
      "Programmable timed feeding",
      "3L/12 cup capacity",
      "Dual power supply (adapter + batteries)",
      "Easy to use LCD screen"
    ]
  },
  {
    profession: 'Automatic Feeder',
    name: 'VOLUAS',
    imgSrc: 'https://m.media-amazon.com/images/I/31FCol5w8TL._SL500_.jpg',
    internalLink: '/blog/usb-powered-automatic-dog-food-feeders', // Added internal link
    price: '$54.99',
    features: [
      "4L/16.9 cup capacity",
      "Voice record meal call (10 seconds)",
      "1-4 meals with 0-40 portion choices",
      "Wired or battery power"
    ]
  },
  {
    profession: 'Dual Cat Feeder',
    name: 'oneisall',
    imgSrc: 'https://m.media-amazon.com/images/I/41IyqubT+HL._SL500_.jpg',
    internalLink: '/blog/smart-app-best-automatic-cat-feeder-app-control', // Added internal link
    price: '$50.99',
    features: [
      "Designed for 2 cats (separate bowls)",
      "5L/20 cups capacity",
      "10-second voice recorder",
      "Up to 6 meals a day"
    ]
  }
];

export interface ProductFeature {
  imgSrc: string;
  heading: string;
  subheading: string;
}

export const FeaturesData: ProductFeature[] = [
  {
    imgSrc: '/images/dog6.png',
    heading: "Portion Control",
    subheading: "Give your pet exact dietary requirements",
  },
  {
    imgSrc: '/images/dog5.png',
    heading: "Smart App",
    subheading: "Check who ate how much on your phone",
  },
  {
    imgSrc: '/images/Best-Automatic-Cat-Feeder-with-a-Timer-for-Precise-Wet-Food-Feeding-Schedules.png',
    heading: "Timers",
    subheading: "Set feeding schedules for times/day or slow feeding",
  },
  {
    imgSrc: '/images/dog4.png',
    heading: "Two-Way Audio",
    subheading: "Communicate with your pet and hear responses",
  }
];
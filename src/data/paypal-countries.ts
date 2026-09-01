// Full list of countries PayPal's REST APIs currently support, per
// https://developer.paypal.com/api/codes/country-region (verified fresh).
export const ALL_PAYPAL_COUNTRIES = [
  { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' },
  { name: 'Andorra', code: 'AD' }, { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' }, { name: 'Antigua & Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' }, { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' }, { name: 'Bahrain', code: 'BH' },
  { name: 'Barbados', code: 'BB' }, { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' }, { name: 'Bermuda', code: 'BM' },
  { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia & Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' },
  { name: 'Brazil', code: 'BR' }, { name: 'British Virgin Islands', code: 'VG' },
  { name: 'Brunei', code: 'BN' }, { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' }, { name: 'Cape Verde', code: 'CV' },
  { name: 'Cayman Islands', code: 'KY' }, { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' }, { name: 'China', code: 'C2' },
  { name: 'Colombia', code: 'CO' }, { name: 'Comoros', code: 'KM' },
  { name: 'Congo - Brazzaville', code: 'CG' }, { name: 'Congo - Kinshasa', code: 'CD' },
  { name: 'Cook Islands', code: 'CK' }, { name: 'Costa Rica', code: 'CR' },
  { name: "Côte d'Ivoire", code: 'CI' }, { name: 'Croatia', code: 'HR' },
  { name: 'Cyprus', code: 'CY' }, { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' }, { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' }, { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' }, { name: 'Ethiopia', code: 'ET' },
  { name: 'Falkland Islands', code: 'FK' }, { name: 'Faroe Islands', code: 'FO' },
  { name: 'Fiji', code: 'FJ' }, { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' }, { name: 'French Guiana', code: 'GF' },
  { name: 'French Polynesia', code: 'PF' }, { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' }, { name: 'Gibraltar', code: 'GI' },
  { name: 'Greece', code: 'GR' }, { name: 'Greenland', code: 'GL' },
  { name: 'Grenada', code: 'GD' }, { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guatemala', code: 'GT' }, { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' }, { name: 'Guyana', code: 'GY' },
  { name: 'Honduras', code: 'HN' }, { name: 'Hong Kong SAR China', code: 'HK' },
  { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' },
  { name: 'Ireland', code: 'IE' }, { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' }, { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' }, { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' }, { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Laos', code: 'LA' },
  { name: 'Latvia', code: 'LV' }, { name: 'Lesotho', code: 'LS' },
  { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' }, { name: 'Macedonia', code: 'MK' },
  { name: 'Madagascar', code: 'MG' }, { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' },
  { name: 'Marshall Islands', code: 'MH' }, { name: 'Martinique', code: 'MQ' },
  { name: 'Mauritania', code: 'MR' }, { name: 'Mauritius', code: 'MU' },
  { name: 'Mayotte', code: 'YT' }, { name: 'Mexico', code: 'MX' },
  { name: 'Micronesia', code: 'FM' }, { name: 'Moldova', code: 'MD' },
  { name: 'Monaco', code: 'MC' }, { name: 'Mongolia', code: 'MN' },
  { name: 'Montenegro', code: 'ME' }, { name: 'Montserrat', code: 'MS' },
  { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' },
  { name: 'Namibia', code: 'NA' }, { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' },
  { name: 'New Caledonia', code: 'NC' }, { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' }, { name: 'Niue', code: 'NU' },
  { name: 'Norfolk Island', code: 'NF' }, { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' }, { name: 'Palau', code: 'PW' },
  { name: 'Panama', code: 'PA' }, { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' }, { name: 'Pitcairn Islands', code: 'PN' },
  { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' },
  { name: 'Qatar', code: 'QA' }, { name: 'Réunion', code: 'RE' },
  { name: 'Romania', code: 'RO' }, { name: 'Russia', code: 'RU' },
  { name: 'Rwanda', code: 'RW' }, { name: 'Samoa', code: 'WS' },
  { name: 'San Marino', code: 'SM' }, { name: 'São Tomé & Príncipe', code: 'ST' },
  { name: 'Saudi Arabia', code: 'SA' }, { name: 'Senegal', code: 'SN' },
  { name: 'Serbia', code: 'RS' }, { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leone', code: 'SL' }, { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' },
  { name: 'Solomon Islands', code: 'SB' }, { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' }, { name: 'South Korea', code: 'KR' },
  { name: 'Spain', code: 'ES' }, { name: 'Sri Lanka', code: 'LK' },
  { name: 'St. Helena', code: 'SH' }, { name: 'St. Kitts & Nevis', code: 'KN' },
  { name: 'St. Lucia', code: 'LC' }, { name: 'St. Pierre & Miquelon', code: 'PM' },
  { name: 'St. Vincent & Grenadines', code: 'VC' }, { name: 'Suriname', code: 'SR' },
  { name: 'Svalbard & Jan Mayen', code: 'SJ' }, { name: 'Swaziland', code: 'SZ' },
  { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' },
  { name: 'Taiwan', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania', code: 'TZ' }, { name: 'Thailand', code: 'TH' },
  { name: 'Togo', code: 'TG' }, { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad & Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' },
  { name: 'Turkmenistan', code: 'TM' }, { name: 'Turks & Caicos Islands', code: 'TC' },
  { name: 'Tuvalu', code: 'TV' }, { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' }, { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' }, { name: 'United States', code: 'US' },
  { name: 'Uruguay', code: 'UY' }, { name: 'Vanuatu', code: 'VU' },
  { name: 'Vatican', code: 'VA' }, { name: 'Venezuela', code: 'VE' },
  { name: 'Vietnam', code: 'VN' }, { name: 'Wallis & Futuna', code: 'WF' },
  { name: 'Yemen', code: 'YE' }, { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' },
]

// --- Your shipping rules ---
// SA and UAE cancelled per your instruction. FR/JP/KR/MY are here but
// FLAGGED: order-webhook.js has no logistics channel configured for any
// of these four yet — get codes from SPfulfillment before this goes live,
// or remove them from this list until then.
export const FREE_SHIPPING_COUNTRIES = ['US', 'DE', 'FR', 'NL', 'BE', 'GB', 'CA', 'AU', 'JP', 'KR', 'SG', 'MY']
export const FLAT_RATE_COUNTRIES: string[] = []
export const FLAT_RATE_AMOUNT = 3.0

export type ShippingStatus = 'free' | 'flat' | 'unsupported'

export function getShippingStatus(countryCode: string): ShippingStatus {
  if (FREE_SHIPPING_COUNTRIES.includes(countryCode)) return 'free'
  if (FLAT_RATE_COUNTRIES.includes(countryCode)) return 'flat'
  return 'unsupported'
}

// Only show countries you actually ship to in the checkout dropdown,
// instead of all ~180 PayPal-supported countries.
export const SUPPORTED_COUNTRIES = ALL_PAYPAL_COUNTRIES.filter(
  (c) => FREE_SHIPPING_COUNTRIES.includes(c.code) || FLAT_RATE_COUNTRIES.includes(c.code)
)

// --- Estimated transit time + carrier per country ---
export const TRANSIT_TIMES: Record<string, { days: string; carrier: string }> = {
  US: { days: '5–9 business days', carrier: 'USPS' },
  DE: { days: '8–12 business days', carrier: 'DHL' },
  FR: { days: '8–10 business days', carrier: 'La Poste / Colissimo' },
  NL: { days: '8–12 business days', carrier: 'PostNL' },
  BE: { days: '8–12 business days', carrier: 'bpost' },
  GB: { days: '4–7 business days', carrier: 'Royal Mail / Evri' },
  CA: { days: '7–12 business days', carrier: 'Canada Post' },
  AU: { days: '6–9 business days', carrier: 'Australia Post' },
  JP: { days: '3–6 business days', carrier: 'Local Courier' },
  KR: { days: '3–6 business days', carrier: 'Local Courier' },
  SG: { days: '4–7 business days', carrier: 'SingPost' },
  MY: { days: '4–7 business days', carrier: 'Pos Malaysia' },
}

export function getTransitMessage(countryCode: string): string | null {
  const info = TRANSIT_TIMES[countryCode]
  if (!info) return null
  return `Your package will be dispatched within 3 days and be delivered to you via ${info.carrier} in ${info.days} thereafter. Usually on the sooner end!`
}

// --- Remote-area postal code blocking ---
// Blocks known remote/surcharge zones per YunExpress's Tier 1 remote-region
// list. Message shown when a postal code falls inside a blocked range.
export const REMOTE_POSTAL_BLOCK_MESSAGE =
  "Sorry we don't deliver to this postal/zip code. Please choose another."

type RemoteBlock = {
  country: string
  region: string
  test: (postalCode: string) => boolean
}

// Helper: numeric range check, tolerant of dashes/spaces/leading zeros.
function inNumericRange(value: string, min: number, max: number): boolean {
  const digits = value.replace(/\D/g, '')
  if (!digits) return false
  const num = parseInt(digits, 10)
  return num >= min && num <= max
}

// Helper: UK-style alpha prefix + numeric range, e.g. "BT1"–"BT94".
function inUkPrefixRange(value: string, prefix: string, min: number, max: number): boolean {
  const normalized = value.toUpperCase().replace(/\s/g, '')
  if (!normalized.startsWith(prefix)) return false
  const numPart = normalized.slice(prefix.length).match(/^\d+/)
  if (!numPart) return false
  const num = parseInt(numPart[0], 10)
  return num >= min && num <= max
}

const REMOTE_BLOCKS: RemoteBlock[] = [
  // United States
  { country: 'US', region: 'Alaska', test: (p) => inNumericRange(p, 99501, 99950) },
  { country: 'US', region: 'Hawaii', test: (p) => inNumericRange(p, 96701, 96898) },
  { country: 'US', region: 'Puerto Rico & US Virgin Islands', test: (p) =>
      inNumericRange(p, 600, 988) || inNumericRange(p, 801, 851) },
  { country: 'US', region: 'Guam & Northern Mariana Is.', test: (p) => inNumericRange(p, 96910, 96952) },
  { country: 'US', region: 'APO / FPO Military Addresses', test: (p) =>
      inNumericRange(p, 9000, 9999) || inNumericRange(p, 96200, 96699) },

  // United Kingdom
  { country: 'GB', region: 'Northern Ireland', test: (p) => inUkPrefixRange(p, 'BT', 1, 94) },
  { country: 'GB', region: 'Scottish Highlands & Islands', test: (p) =>
      inUkPrefixRange(p, 'HS', 1, 9) ||
      inUkPrefixRange(p, 'IV', 1, 56) ||
      inUkPrefixRange(p, 'KW', 1, 17) ||
      inUkPrefixRange(p, 'PA', 20, 78) ||
      inUkPrefixRange(p, 'PH', 19, 50) ||
      inUkPrefixRange(p, 'ZE', 1, 3) ||
      inUkPrefixRange(p, 'FK', 17, 21) },
  { country: 'GB', region: 'Isle of Man & Scilly Isles', test: (p) =>
      inUkPrefixRange(p, 'IM', 1, 9) || inUkPrefixRange(p, 'TR', 21, 25) },
  { country: 'GB', region: 'Channel Islands', test: (p) =>
      inUkPrefixRange(p, 'GY', 1, 10) || inUkPrefixRange(p, 'JE', 1, 4) },

  // Canada
  { country: 'CA', region: 'Northern Territories', test: (p) => {
      const normalized = p.toUpperCase().replace(/\s/g, '')
      return /^[YX]0[A-Z]/.test(normalized)
    } },
  { country: 'CA', region: 'Rural / fly-in postcodes', test: (p) => {
      const normalized = p.toUpperCase().replace(/\s/g, '')
      return /^[A-Z]0[A-Z]\d[A-Z]\d$/.test(normalized) || /^[A-Z]0[A-Z]/.test(normalized)
    } },

  // Australia
  { country: 'AU', region: 'Outback Northern Territory', test: (p) => inNumericRange(p, 800, 899) },
  { country: 'AU', region: 'Offshore Territories', test: (p) => {
      const digits = p.replace(/\D/g, '')
      return ['2898', '2899', '6798', '6799'].includes(digits)
    } },
  { country: 'AU', region: 'Remote WA, QLD & TAS Outer', test: (p) =>
      inNumericRange(p, 6700, 6797) || inNumericRange(p, 4700, 4899) || inNumericRange(p, 7000, 7499) },

  // France
  { country: 'FR', region: 'Corsica', test: (p) => inNumericRange(p, 20000, 20999) },
  { country: 'FR', region: 'DOM-TOM Overseas', test: (p) =>
      inNumericRange(p, 97100, 97899) || inNumericRange(p, 98400, 98899) },

  // Germany
  { country: 'DE', region: 'North Sea & Baltic Islands', test: (p) => {
      const digits = p.replace(/\D/g, '')
      const exact = ['18565', '25849', '25859', '25863', '25869', '27498']
      if (exact.includes(digits)) return true
      return inNumericRange(p, 25929, 25999) || inNumericRange(p, 26465, 26579)
    } },

  // Netherlands
  { country: 'NL', region: 'Wadden Islands', test: (p) =>
      inNumericRange(p, 1790, 1797) || inNumericRange(p, 8881, 8899) || inNumericRange(p, 9160, 9179) },

  // Japan — format like "901-3300"; strip dash and compare digit string
  { country: 'JP', region: 'Okinawa Outer Islands', test: (p) => {
      const digits = p.replace(/\D/g, '')
      return digits.length === 7 && digits >= '9013300' && digits <= '9071800'
    } },
  { country: 'JP', region: 'Izu & Ogasawara Islands', test: (p) => {
      const digits = p.replace(/\D/g, '')
      return digits.length === 7 && digits >= '1000100' && digits <= '1002101'
    } },

  // South Korea
  { country: 'KR', region: 'Jeju Island & Ulleungdo', test: (p) =>
      inNumericRange(p, 63000, 63644) || inNumericRange(p, 40200, 40240) },

  // Singapore
  { country: 'SG', region: 'Sentosa Island', test: (p) => inNumericRange(p, 98000, 98999) },
  { country: 'SG', region: 'Jurong Island', test: (p) => inNumericRange(p, 627000, 629999) },

  // Malaysia
  { country: 'MY', region: 'East Malaysia (Sabah & Sarawak)', test: (p) =>
      inNumericRange(p, 88000, 91399) || inNumericRange(p, 93000, 98899) },
]

export function isRemoteBlockedPostalCode(countryCode: string, postalCode: string): boolean {
  if (!postalCode) return false
  return REMOTE_BLOCKS.some((block) => block.country === countryCode && block.test(postalCode))
}
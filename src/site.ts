/** Brand and contact details, in one place. */
export const SITE = {
  name: 'SMPP Forge',
  tagline: 'Carrier-grade SMS infrastructure you own',
  url: 'https://smppforge.com',
  salesEmail: 'sales@smppforge.com',
  infoEmail: 'info@smppforge.com',
  /** Public office location shown on the site and in structured data. */
  hq: { city: 'New York', region: 'NY', country: 'United States', countryCode: 'US', label: 'New York, NY' },
  responseTime: 'one business day',
} as const;

export const host = SITE.url.replace('https://', '');

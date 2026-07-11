export interface AffiliateLink {
  key: string;
  url: string;
  label: string;
  enabled: boolean;
  sponsored: boolean;
}

export const affiliateLinks: Record<string, AffiliateLink> = {
  'cursor-site': {
    key: 'cursor-site',
    url: 'https://www.cursor.com/',
    label: 'Visit Cursor',
    enabled: false,
    sponsored: false,
  },
  'windsurf-site': {
    key: 'windsurf-site',
    url: 'https://windsurf.com/',
    label: 'Visit Windsurf',
    enabled: false,
    sponsored: false,
  },
};

export function getAffiliateLink(key?: string) {
  return key ? affiliateLinks[key] : undefined;
}

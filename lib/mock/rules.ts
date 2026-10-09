/*
 * Sample trade-rule results for the homepage checker.
 * Prototype data only — it illustrates the shape of a result, not current regulation.
 */

export type RuleStatus = 'clear' | 'conditions' | 'strict'

export interface RuleResult {
  status: RuleStatus
  summary: string
  steps: string[]
  documents: string[]
  authority: string
  changedThisWeek?: string
}

export const statusMeta: Record<RuleStatus, { label: string; tone: string; dot: string }> = {
  clear: { label: 'Good to go', tone: 'bg-leaf text-ink', dot: 'bg-[#3E7A1F]' },
  conditions: { label: 'Allowed with conditions', tone: 'bg-sun text-ink', dot: 'bg-ink' },
  strict: { label: 'Allowed · strict controls', tone: 'bg-[#FDD9D5] text-ink', dot: 'bg-coral' },
}

const baseDocuments = ['Commercial invoice', 'Packing list', 'Certificate of origin', 'Phytosanitary certificate']

const destinationDocuments: Record<string, string[]> = {
  'United States': ['FDA facility registration', 'FDA prior notice'],
  'United Arab Emirates': ['Importer product registration'],
  'United Kingdom': ['IPAFFS pre-notification (importer)'],
  'Saudi Arabia': ['SFDA product registration'],
}

const destinationAuthority: Record<string, string> = {
  'United States': 'USDA-APHIS · US FDA',
  'United Arab Emirates': 'UAE Ministry of Climate Change & Environment',
  'United Kingdom': 'DEFRA · Food Standards Agency',
  'Saudi Arabia': 'Saudi Food & Drug Authority',
}

type LaneRule = Pick<RuleResult, 'status' | 'summary' | 'steps'> & { changedThisWeek?: string }

const laneRules: Record<string, LaneRule> = {
  'Mango|United States': {
    status: 'strict',
    summary: 'Fresh mangoes need approved treatment and pre-clearance inspection before they ship.',
    steps: [
      'Irradiation at an approved facility',
      'Pre-clearance inspection with the destination inspector',
      'Pack in a registered packhouse',
    ],
    changedThisWeek: 'Inspection slot booking now opens 21 days before dispatch.',
  },
  'Mango|United Arab Emirates': {
    status: 'clear',
    summary: 'Routine clearance for fresh mangoes with standard plant-health paperwork.',
    steps: ['Phytosanitary inspection before loading', 'Label with origin and variety'],
  },
  'Mango|United Kingdom': {
    status: 'conditions',
    summary: 'Allowed, but the importer must pre-notify each consignment.',
    steps: ['Phytosanitary certificate per consignment', 'Importer pre-notifies before arrival'],
  },
  'Mango|Saudi Arabia': {
    status: 'conditions',
    summary: 'Allowed once the product and importer are registered.',
    steps: ['Register the product with the food authority', 'Arabic labelling on retail packs'],
  },
  'Rice|United States': {
    status: 'conditions',
    summary: 'Allowed. Lots are often tested for pesticide residues at the port.',
    steps: ['Residue (MRL) test from an accredited lab', 'File prior notice before arrival'],
  },
  'Rice|United Arab Emirates': {
    status: 'clear',
    summary: 'Basmati and non-basmati clear routinely with standard documents.',
    steps: ['Lab report for grain quality', 'Label with crop year and variety'],
  },
  'Rice|United Kingdom': {
    status: 'conditions',
    summary: 'Allowed. Residue limits are tight, so test before you book freight.',
    steps: ['Residue (MRL) test against UK limits', 'Importer pre-notification'],
  },
  'Rice|Saudi Arabia': {
    status: 'clear',
    summary: 'Routine clearance once the product is registered.',
    steps: ['Product registration with the food authority', 'Arabic labelling'],
  },
  'Turmeric|United States': {
    status: 'strict',
    summary: 'Spices face close checks for contaminants; expect lab testing on arrival.',
    steps: ['Heavy-metal (lead) test per lot', 'Microbial test from an accredited lab', 'File prior notice'],
  },
  'Turmeric|United Arab Emirates': {
    status: 'clear',
    summary: 'Routine clearance with a quality certificate.',
    steps: ['Quality certificate from an accredited lab'],
  },
  'Turmeric|United Kingdom': {
    status: 'conditions',
    summary: 'Allowed with residue and contaminant testing.',
    steps: ['Ethylene oxide and residue testing', 'Importer pre-notification'],
  },
  'Turmeric|Saudi Arabia': {
    status: 'conditions',
    summary: 'Allowed once registered; spices are sampled at the port.',
    steps: ['Product registration', 'Lab report for contaminants'],
  },
  'Cashew|United States': {
    status: 'conditions',
    summary: 'Allowed. Tree nuts need allergen labelling on retail packs.',
    steps: ['Allergen labelling', 'Aflatoxin test per lot', 'File prior notice'],
  },
  'Cashew|United Arab Emirates': {
    status: 'clear',
    summary: 'Routine clearance for graded cashew kernels.',
    steps: ['Grade certificate'],
  },
  'Cashew|United Kingdom': {
    status: 'conditions',
    summary: 'Allowed with aflatoxin testing and allergen labelling.',
    steps: ['Aflatoxin test per lot', 'Allergen labelling'],
  },
  'Cashew|Saudi Arabia': {
    status: 'clear',
    summary: 'Routine clearance once the product is registered.',
    steps: ['Product registration', 'Arabic labelling'],
  },
}

export function getRuleResult(product: string, destination: string): RuleResult {
  const lane = laneRules[`${product}|${destination}`] ?? {
    status: 'conditions' as const,
    summary: 'No lane-specific notes yet. Standard export documents apply.',
    steps: ['Confirm requirements with your customs agent'],
  }
  return {
    ...lane,
    documents: [...baseDocuments, ...(destinationDocuments[destination] ?? [])],
    authority: destinationAuthority[destination] ?? 'Destination customs',
  }
}

export const shortDestination: Record<string, string> = {
  'United States': 'USA',
  'United Arab Emirates': 'UAE',
  'United Kingdom': 'UK',
  'Saudi Arabia': 'KSA',
}

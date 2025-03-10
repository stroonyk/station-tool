import { getState, IPublicState } from '../../helpers/helpers';

export interface ICustomMastheadOptions {
  custom_title?: string;
  imageUrl?: string;
  imageWidth?: string;
  videoUrl?: string;
  documents?: IPublicState['page']['documents'];
  static_categories?: Array<any>;
  allowedSearchFilters?: ('article' | 'sequence' | 'article_template')[];
  mastheadCopy?: string[],
  mastheadCopyTitle?: string
}

export interface ICustomMastHeads {
  [key: string]: ICustomMastheadOptions;
}

const customMastheads: ICustomMastHeads = {
  'rural-protect': {
    imageUrl: '/assets/img/branding/rural-protect-logo.svg',
  },
  'rural-protect-elements': {
    imageUrl: '/assets/img/branding/rpe-logo.svg',
    imageWidth: '300px',
  },
  'the-hunting-office': {
    imageUrl: '/assets/img/branding/hunting_office_logo.jpg',
    imageWidth: '200px',
    videoUrl: 'https://player.vimeo.com/video/314524998',
  },
  'willis-towers-watson': {
    imageUrl: '/assets/img/branding/willis-towers-watson-svg.svg',
  },
  'risk-managers': {
    imageUrl: '/assets/img/branding/axa_logo.svg',
  },
  inspire: {
    imageUrl: '/assets/img/branding/InspireLogo_white_bg.svg',
    imageWidth: '200px',
  },
  'hb-underwriting': {
    custom_title: 'Employer Protect, Search For Advice Articles & Templates.',
    imageUrl: '/assets/img/branding/HB-underwriting-logo-white.png',
    imageWidth: '200px',
  },
  'cyber-essentials': {
    custom_title: 'Welcome To Your Cyber Hub',
    allowedSearchFilters: ['article', 'sequence'],
    mastheadCopy: ["Here you will find a wealth of knowledge and expert advice designed to help you prevent cyber incidents happening in the first place, and recover quickly if they do.",
                  "You can also call the rradar legal advisory service for practical cyber and data advice. Our number is 0808 175 6943. We are open 8:00am until 6:00pm Monday to Friday, except bank holidays."]
  },
  'broker-station':{
    allowedSearchFilters: ['article', 'sequence'],
    mastheadCopyTitle: "About these resources",
    mastheadCopy: ["We have produced a range of broker resources to help you explain the rradar benefits and services that are available to prospective and existing policyholders.",
                    "We want to ensure that our broker partners have everything they need when talking about the added value rradar provides. Our Business Development Team can also support you with a range useful rradar information packs and case studies, registration reports, joint marketing campaigns, webinars and events and provide you with comprehensive training and development sessions, to help boost sales and policyholder retention and loyalty.",
                    "If you require any assistance or have any questions, please contact our Business Development Team at brokers@rradar.com" ]
  }
};

export default customMastheads;

import * as React from 'react';
import getState from '../../helpers/getState';
// import MastheadCoronavirus from './components/MastheadCoronavirus';
import MastheadStandard from './components/MastheadStandard';
import MastheadVideoDocuments from './components/MastheadVideoDocuments';
import customMastheads from './customMastheads';

export interface IMastheadProps {
  searchTerm?: string;
  isOpen?: boolean;
  searchResultsCB?: () => void;
}

export default function Masthead(props: IMastheadProps): React.ReactNode {
  const getRenderedMasthead = (customMasthead: string | null): React.ReactNode => {
    // debugger;
    if (getState().permissions.includes('STATIC_LANDING_CATEGORIES') && customMasthead) {
      return <MastheadVideoDocuments {...getMastheadProps(customMasthead)} />;
    }
    return <></>;
  };

  const getMastheadProps = (customMasthead: string) => {
    return customMastheads[customMasthead];
  };
  const x = getState();
  // debugger;
  return (
    <div>
      <MastheadStandard
        isOpen={props.isOpen}
        searchTerm={props.searchTerm}
        searchResultsCB={props.searchResultsCB}
        brokerLogoUrl={getState().user.brokerLogo || customMastheads[getState().user.custom_landing_page]?.imageUrl}
        imageWidth={customMastheads[getState().user.custom_landing_page]?.imageWidth}
        title={customMastheads[getState().user.custom_landing_page]?.custom_title || getState().page.title}
        render={() => getRenderedMasthead(getState().user.custom_landing_page)}
      />
    </div>
  );
}

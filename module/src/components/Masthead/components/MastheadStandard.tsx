import * as React from 'react';
import Search from '../../Search';

// import Search from '../../common/Search';

// import parser from 'html-react-parser';
import { getState } from '../../../helpers/helpers';
import customMastheads from '../customMastheads';
import { getSearchSuggestions } from '../../../utils/searchService';

export interface IMastheadStandardProps {
  title: string;
  searchTerm?: string;
  isOpen?: boolean;
  brokerLogoUrl?: string;
  searchResultsCB?: () => void;
  imageWidth?: string;
  render?: () => React.ReactElement;
}

export default function MastheadStandard(props: IMastheadStandardProps): JSX.Element {
  // const searchFunction = async (searchTerm: string): Promise<{ id: string; title: string; path: string }[]> => {
  //   return getSearchSuggestions(searchTerm);
  // };

  const renderMastheadCopyTitle = () => {
    if (customMastheads[getState().user.custom_landing_page].mastheadCopyTitle) {
      return <h2 className="headline-02">{customMastheads[getState().user.custom_landing_page].mastheadCopyTitle}</h2>;
    }
    return <></>;
  };
  const renderMastheadCopyContent = () => {
    if (customMastheads[getState().user.custom_landing_page].mastheadCopy) {
      return customMastheads[getState().user.custom_landing_page].mastheadCopy?.map((paragraph) => {
        return (
          <p
            style={{
              fontSize: '90%',
            }}
          >
            {paragraph}
          </p>
        );
      });
    }
    return <></>;
  };
  const renderMastheadCopy = () => {
    if (customMastheads[getState().user.custom_landing_page]) {
      if (
        customMastheads[getState().user.custom_landing_page].mastheadCopy ||
        customMastheads[getState().user.custom_landing_page].mastheadCopyTitle
      ) {
        return (
          <aside className="masthead-coronavirus">
            {renderMastheadCopyTitle()}
            {renderMastheadCopyContent()}
          </aside>
        );
      }
    }
    return <></>;
  };

  return (
    <div className="masthead masthead-leftalign-wrapper">
      <div className="masthead-inner masthead-inner-leftalign container">
        <div className="masthead-content masthead-content-leftalign">
          {props.brokerLogoUrl && (
            <img
              className="masthead-logo"
              src={props.brokerLogoUrl}
              alt=""
              width={props.imageWidth ? props.imageWidth : '100%'}
            />
          )}
          {/* {props.title ? <h1 className="masthead-title">{parser(props.title)}</h1> : <></>} */}
          {props.title ? <h1 className="masthead-title">{props.title}</h1> : <></>}
          <Search
            searchTerm={props.searchTerm}
            isOpen={props.isOpen}
            callbacks={{ afterSearch: props.searchResultsCB }}
            allowedFilters={customMastheads[getState().user.custom_landing_page]?.allowedSearchFilters}
          />
          {/* <Search searchUrl="/station/search?term=" searchFunction={searchFunction} /> */}

          {props.render && props.render()}
        </div>
        {renderMastheadCopy()}
        {/* {getState().config.coronavirus === 'true' && (
          <aside className="masthead-coronavirus">
            <h2 className="headline-02">Coronavirus Pandemic</h2>
            <p
              style={{
                fontSize: '90%',
              }}
            >
              We&apos;re providing practical guidance and advice on how to
              minimise the effects of coronavirus on a business in key areas
              including employment, health and safety, and data.
            </p>
            <a href="/categories/1522?banner=COVID19">
              → View our Coronavirus Category
            </a>
          </aside>
        )} */}
      </div>
    </div>
  );
}

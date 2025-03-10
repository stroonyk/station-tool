import { ICategory } from '@rradar/station-api-module/dist/station/categories';
import * as React from 'react';
import { getSessionId, getState } from '../../../helpers/helpers';
import getStation from '../../../utils/getStation';
import { Link } from 'react-router-dom';

export interface IMastheadVideoDocumentsProps {
  videoUrl?: string;
  documents?: any;
  static_categories?: any;
}

const MastheadVideoDocuments: React.FC<IMastheadVideoDocumentsProps> = (props) => {
  const [staticCategories, setStaticCategories] = React.useState<ICategory[]>();
  const [staticDocuments, setStaticDocuments] = React.useState<any[]>();
  React.useEffect(() => {
    if (getState().user.features_by_key['STATIC_LANDING_CATEGORIES']) {
      getCategories();
    }
    if (getState().user.features_by_key['STATIC_LANDING_DOCUMENTS']) {
      getDocuments();
    }
  }, []);

  const getCategories = async () => {
    const categoryIds = getState().user.features_by_key['STATIC_LANDING_CATEGORIES'].value[0].split(',');
    const categoryPromises = categoryIds?.map((categoryId) => getStation().categories().get(parseInt(categoryId)));
    const categoryResults = await Promise.all(categoryPromises);
    const categories = categoryResults?.map(({ category }) => category);
    setStaticCategories(categories);
  };

  const getDocuments = async () => {
    const documentsUuid = getState().user.features_by_key['STATIC_LANDING_DOCUMENTS'].value;
    const documents = await fetch(`${getState().config.api}/resources/folders/${documentsUuid}/items`, {
      method: 'GET',
      headers: {
        Authorization: getSessionId(),
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => responseJson.item);
    setStaticDocuments(documents);
  };
  return (
    <div>
      {props.videoUrl && (
        <iframe
          src={props.videoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen={true}
          className="hunting-office-video"
        />
      )}

      {staticDocuments && (
        <div className={'landing-page-download-tiles'}>
          {staticDocuments.map((document) => {
            return (
              <div
                className="tile tile--link-title-underline tile--white article flex-column"
                key={document.id}
                style={{ minWidth: '300px' }}
              >
                <div className="tile-contents">
                  <div className="header">
                    <h2>{document.title}</h2>
                  </div>
                  <p>{document.description ? document.description : 'No Description'}</p>
                  <a href={`/landing-page-documents/${document.id}`} className="primary-button">
                    Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {staticCategories && (
        <div className={'landing-page-download-tiles'}>
          {staticCategories?.map((category: ICategory) => {
            return (
              <div
                className="tile tile--link-title-underline tile--white article flex-column"
                key={category.id}
                style={{ minWidth: '300px' }}
              >
                <div className="tile-contents">
                  <div className="header">
                    <h2>{category.title}</h2>
                  </div>
                  <p>{category.description ? category.description.replace(/<[^>]+>/g, '') : 'No Description'}</p>
                  <Link to={`/Station/categories/${category.id}`}>
                    <a className="primary-button">View</a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MastheadVideoDocuments;

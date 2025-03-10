import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import readingTime from 'reading-time';
import classnames from 'classnames';
import getStation from '../../../utils/getStation';
// import {
//   isAdminPage,
//   pluraliseTypes,
//   downloadTemplate,
// } from '../../../../../helpers';

export interface ISearchItemProps {
  item: any;
  index: number;
  onClick?: (data: any) => void;
}

export default function SearchItem({ index, item, onClick }: ISearchItemProps): React.ReactElement {
  const getIcon = (search_type: string): IconName => {
    switch (search_type) {
      case 'article': {
        return 'book-open';
      }
      case 'sequence': {
        return 'books';
      }
      case 'article_template': {
        return 'file-download';
      }
    }
  };

  const isArticle = item.search_type === 'article';
  const isSequence = item.search_type === 'sequence';
  const isTemplate = item.search_type === 'article_template';
  const [itemURL, setItemURL] = React.useState('');

  const { sequence_articles } = isSequence && item.elasticsearch_index;

  const estimatedReadTime = isArticle && Math.ceil(readingTime(item.content).minutes);

  const getResultItemHref = async (type, source, isAdmin) => {
    // const pluralised_type = pluraliseTypes(type);
    // if (type === 'sequence') {
    //   const {
    //     sequence: { sequence_articles },
    //   } = await getStation().sequences().access(source.id).get();
    //   const first_published_article = sequence_articles.find(
    //     (item) => item.article.state === 'published'
    //   );
    //   return !isAdmin
    //     ? `/articles/${first_published_article.article.id}?${type}=${source.id}`
    //     : `/admin/${pluralised_type}/${source.id}/edit`;
    // }
    // return !isAdmin
    //   ? `/${pluralised_type}/${source.id}`
    //   : `/admin/${pluralised_type}/${source.id}/edit`;
  };

  // React.useEffect(() => {
  //   if (!item) return;
  //   getResultItemHref(item.search_type, item, isAdminPage()).then(
  //     (response) => {
  //       setItemURL(response);
  //     }
  //   );
  // }, [item]);

  // const handleClick = (e: any, id: number) => {
  //   if (onClick) {
  //     e.preventDefault();
  //     onClick(item);
  //   }
  //   if (isTemplate) {
  //     e.preventDefault();
  //     downloadTemplate(null, id);
  //   }
  // };

  const getItemTitle = (searchIndexType: 'article' | 'sequence' | 'article_template') => {
    switch (searchIndexType) {
      case 'article':
        return 'View Article';
      case 'sequence':
        return 'View Guide';
      case 'article_template':
        return 'Download Template';
    }
  };

  return (
    <div
      className={classnames('search-results-item', {
        [item.search_type]: true,
        'search-results-item--first': index === 1,
      })}
      title={getItemTitle(item.search_type)}
    >
      <a
        href={itemURL}
        // onClick={(e) => handleClick(e, item.resource_id)}
      >
        <div className="search-results-item--icon">
          <FontAwesomeIcon icon={['fal', getIcon(item.search_type)]} />
        </div>
        <div className="search-results-item--content">
          <div className="search-results-item--title">{item.title}</div>
          <div className="search-results-item--subtitle">
            {isArticle && (
              <span className="search-results-item--meta">{`Reading time ${estimatedReadTime} ${
                estimatedReadTime === 1 ? 'minute' : 'minutes'
              }`}</span>
            )}

            {isArticle && <span>{item.jurisdiction_titles.join(', ')}</span>}

            {isSequence && `Contains ${sequence_articles.length} Articles`}
          </div>
        </div>
        {item.promoted && <div className="search-results-item--promoted">Promoted</div>}

        <div>
          <FontAwesomeIcon icon={['fal', 'long-arrow-right']} />
        </div>
      </a>
    </div>
  );
}

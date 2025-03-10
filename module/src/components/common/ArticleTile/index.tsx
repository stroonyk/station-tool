import React from 'react';
import classnames from 'classnames';
import { format, parseISO } from 'date-fns';
import _, { isEmpty } from 'lodash';
import { IArticle } from '@rradar/station-api-module/dist/station/articles';

export interface IArticleTileProps {
  article: IArticle;
  renderArticleJurisdiction?: any;
  index: number;
  onClick?: (data: IArticle) => void;
}

export default function ArticleTile({
  article,
  renderArticleJurisdiction,
  index,
  onClick,
}: IArticleTileProps): React.ReactElement {
  let meta_data;

  if (article.metadata) {
    meta_data = article.metadata;
  }
  // const hasVideos = !isEmpty(meta_data && meta_data.videos);
  // const hasAudios = !isEmpty(meta_data && meta_data.audios);
  // const hasTemplates = !isEmpty(meta_data && meta_data.templates);
  // const isTrustedPartner = article.source_id && article.source_id !== 7;

  return (
    <>
      <a
        style={{ animationDelay: `${index * 0.1}s` }}
        className={classnames('tile tile--350 tile--link-title-underline tile--white article flex-column', {
          promoted: article.promoted,
        })}
        href={`/articles/${article.id}`}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (onClick) {
            e.preventDefault();
            () => onClick(article);
          }
        }}
        title={article.title}
      >
        <div className="tile-contents">
          <h2>{article.title}</h2>
          <div className="subtext my-s">{article.summary}</div>
          <div
            className="subtext fs--s mt-auto"
            dangerouslySetInnerHTML={{
              __html: renderArticleJurisdiction
                ? renderArticleJurisdiction(article.jurisdiction_ids)
                : article.jurisdiction_titles,
            }}
          />
          {article.reviewed_at && (
            <div className="subtext fs--s">
              <span style={{ paddingBottom: '1rem' }}>
                Last Updated: {format(parseISO(article.reviewed_at), 'do MMM, yyyy')}
              </span>
            </div>
          )}
        </div>
        {/* <div
          className="tile-title"
          dangerouslySetInnerHTML={{ __html: article.title }}
        /> */}
      </a>
    </>
  );
}

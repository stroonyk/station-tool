import * as cookies from 'cookies-js';
import Station from '@rradar/station-api-module';
import getStation from '../utils/getStation';
import { IArticle } from '@rradar/station-sdk';
// import { useStationContext } from '../store/station-context';

// const stationCtx = useStationContext();

export interface IPublicState {
  title: string;
  path: string[];
  page: {
    title: string;
    description: string;
    slug: string;
    id: number;
    category_ids: Array<number>;
    sequence: number;
    number: number;
    actions: [
      {
        label: string;
        type: string;
        disabled: boolean;
      },
    ];
    jurisdiction_name: string;
    taxonomy: string;
    source: number;
    documents?: Array<any>;
    static_categories?: Array<any>;
  };
  config: {
    api: string;
    coronavirus: string;
    grace_api: string;
    grace_redirect_url_uid: string;
    redirect_url_uid: string;
    resourceManagerTemplateFolderUuid: string;
    resourceManagerAssetFolderUuid: string;
    resourceManagerSearchFolderUuid: string;
    joyrideReturnDays: string;
    pusherId: string;
    lms_api: string;
    lock_time: number;
  };
  user: any;
  permissions: string[];
  sentry: {
    dsn: string;
    environment: string;
  };
}
type stationWindow = typeof window & {
  __PUBLIC_STATE__: IPublicState;
};
export function getState(): IPublicState {
  return (window as stationWindow).__PUBLIC_STATE__ || null;
}
export function getSessionId() {
  const cookie = Cookie('session_id');
  if (cookie) {
    return atob(cookie.toString().replace(/\s/g, ''));
  }
}
export const station = new Station();

export async function downloadTemplate(id: number) {
  try {
    const response = await getStation().templates().sources().get(id);
    if (response.url) {
      window.location.href = response.url;
    }
  } catch {
    alert('prodbliemo');
  }
}

export const getTitleById = (list: any[], id: number | string): string | undefined => {
  return list.find((item) => item.id === id)?.title;
};
export const getDescriptionById = (list: any[], id: number) => {
  return list.find((item) => item.id === id)?.description;
};

export const getDynamicValueById = (list: any[], id: number | string, key: string) => {
  return list.find((item) => item.id === id)?.[key];
};

export const formatDate = (date) => {
  // debugger;
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

interface TemplateTile {
  title: string;
  subtext1: string;
  iconClass: string;
  id: number;
}

export const getTemplates = async (current: number): Promise<TemplateTile[]> => {
  const { template: popularTemplates, pages } = await getStation()
    .templates()
    .mostPopular()
    .index({ page: current, size: 12 });

  const templateTiles: TemplateTile[] = popularTemplates.map((template) => ({
    title: template.title,
    // subtext1: `Updated at: ${new Date(template.updated_at).toLocaleDateString()}`,
    updated_at: template.updated_at,
    // iconClass: 'fas fa-file-word',
    description: template.description,
    file_type: template.file_type,
    id: template.id,
  }));

  return templateTiles;
};

export const getArticles = async (page: number): Promise<IArticle[]> => {
  const articles = await getStation()
    .articles()
    .index({
      no_link_tracking: true,
      '!state': 'deleted',
      page: page,
      size: 25,
      sort: [{ key: 'updated_at', order: 'DESC' }],
    });
  return articles.article;
};

export const isFavourite = (list: any[], id: number): boolean => {
  return list.some((item) => item.id === id);
};

// export const getMoreArticles = async (page: number): Promise<IArticle[]> => {
//   const articles = await getStation()
//     .articles()
//     .index({
//       no_link_tracking: true,
//       '!state': 'deleted',
//       page: page,
//       size: 25,
//       sort: [{ key: 'updated_at', order: 'DESC' }],
//     });
//   return articles.article;
// };

export const getSectors = async (id:number): Promise<IArticle[]> => {
  const sectors = await getStation().sectors().articles().index(id);
  const sectorList = sectors.article.map(({ id, title, excerpt }) => ({ id, title, excerpt }));
  // stationCtx.setArticles(sectorList, id, ARTICLES_TYPE.CATEGORY);
  // setLoading(false);
  return sectorList;
};

// export const favouriteClicked = async (articleId: number, list: []) => {
//   // event.preventDefault();
//   isFavourite(list, articleId)
//     ? await getStation().articles().favourite().delete(articleId)
//     : await getStation().articles().favourite().post(articleId);
// };
export const fileTypeIcons: Record<string, string> = {
  docx: 'fa-file-word',
  doc: 'fa-file-word',
  xls: 'fa-file-excel',
  xlsx: 'fa-file-excel',
  pdf: 'fa-file-pdf',
  ppt: 'fa-file-powerpoint',
  pptx: 'fa-file-powerpoint',
  txt: 'fa-file-alt',
  jpg: 'fa-file-image',
  png: 'fa-file-image',
  zip: 'fa-file-archive',
  mp4: 'fa-file-video',
  mp3: 'fa-file-audio',
  // Add more mappings as needed
};

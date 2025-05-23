import Station, { IArticle } from '@rradar/station-sdk';

export const getArticles = async (stationSDK: Station, page: number): Promise<IArticle[]> => {
  const articles = await stationSDK.articles().index({
    no_link_tracking: true,
    '!state': 'deleted',
    page: page,
    size: 25,
    sort: [{ key: 'updated_at', order: 'DESC' }],
  });
  return articles.article;
};

interface TemplateTile {
  title: string;
  subtext1: string;
  iconClass: string;
  id: number;
}
export const getTemplates = async (stationSDK: Station, current: number): Promise<TemplateTile[]> => {
  const { template: popularTemplates, pages } = await stationSDK
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

export const getSectors = async (stationSDK: Station, id: number): Promise<IArticle[]> => {
  const sectors = await stationSDK.sectors().articles().index(id);
  const sectorList = sectors.article.map(({ id, title, excerpt, updated_at }) => ({ id, title, excerpt, updated_at }));
  return sectorList;
};

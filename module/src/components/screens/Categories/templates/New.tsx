
import MainContentLayout from '../../../layouts/MainContentLayout';

const New = () => {
  // const [highlighted, setHighlightedArticles] = useState([]);
  // const hydrateNewsCache = async (): Promise<void> => {
  //   // const { article } = await getStation().articles().index();
  //   // const articles = await getStation().articles().index({ only_highlighted: true });
  //   const articles = await getStation().categories().index(id);
  //   // debugger;
  //   setHighlightedArticles(articles.article);
  // };
  // useEffect(() => {
  //   hydrateNewsCache();
  // }, []);
  // console.log('highlighted is wesdfs' + highlighted);
  // debugger;
  return (
    <MainContentLayout background="white">
      <h3>hello category</h3>
    </MainContentLayout>
  );
};

export default New;

import { useEffect } from 'react';
import AppConfig from '../../../helpers/AppConfig';
import ClassicStation from './templates/Classic';
import NewStation from './templates/New';

const Home = () => {
  const appConfig = AppConfig.getInstance();

  useEffect(() => {
    appConfig.getConfig()?.navigatedHome();
  }, []);

  return <>{<ClassicStation />}</>;
  // return <>{appConfig.getConfig().classic ? <ClassicStation /> : <NewStation />}</>;
};

export default Home;

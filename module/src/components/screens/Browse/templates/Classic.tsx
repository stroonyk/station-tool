
import MainContentLayout from '../../../layouts/MainContentLayout';
import Masthead from '../../../Masthead';

const New = () => {
  return (
    <MainContentLayout background="white">
      <Masthead
        searchTerm={''}
        isOpen={false}
        // searchResultsCB={this.updateJoyrideOnSearchResults}
      />
    </MainContentLayout>
  );
};

export default New;

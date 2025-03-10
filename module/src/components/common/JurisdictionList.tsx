export interface IGuideProps {
  jurisdictions: [];
}
const JurisdictionList: React.FC<IGuideProps> = ({ jurisdictions }) => {

  return <span>{jurisdictions.map(({ title }) => title).join(', ')}</span>;
};

export default JurisdictionList;

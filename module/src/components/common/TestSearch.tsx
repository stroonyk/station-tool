const TestSearch: React.FC = () => {
  const styles = {
    inputDiv: {
      left: '50%',
      position: 'fixed',
      top: '10px',
      transform: 'translateX(-50%)',
      width: 'fit-content',
      zIndex: '1000',
    },
    inputBox: {
      width: '300px',
      height: '30px',
    },
  };
  return (
    <>
      <div style={styles.inputDiv}>
        <input style={styles.inputBox} type="text"></input>
      </div>
    </>
  );
};

export default TestSearch;

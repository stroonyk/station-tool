import * as React from 'react';

interface IModalHeaderProps {
  title: string;
  subtitle?: string;
  handleClose?: () => void;
}

const ModalHeader: React.FC<IModalHeaderProps> = ({ title, subtitle, handleClose }) => {
  const renderSubtitleIfPresent = () => {
    if (!subtitle) {
      return <></>;
    }
    return (
      <p className="modal-header-contents-subtitle">
        <small>Scroll down to close</small>
      </p>
    );
  };

  const renderCloseButtonIfOnClosePresent = () => {
    if (!handleClose) {
      return <></>;
    }
    return (
      <div className="modal-header-close isPointer" onClick={handleClose}>
        <i className="fa-regular fa-circle-xmark" />
      </div>
    );
  };

  return (
    <div className="modal-header-container flex-row">
      <div className="modal-header-contents flex-column">
        <h1 className="modal-header-contents-title">{title}</h1>
        {renderSubtitleIfPresent()}
      </div>
      {renderCloseButtonIfOnClosePresent()}
    </div>
  );
};

export default ModalHeader;

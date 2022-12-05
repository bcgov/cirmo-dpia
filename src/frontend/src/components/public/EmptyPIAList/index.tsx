import Messages from '../../../pages/PIAListPage/messages';
import EmptyFolder from '../../../assets/empty.svg';

const EmptyPIAList = () => {
  return (
    <div className="component__wrapper">
      <img
        className="img__empty-pia-list"
        src={EmptyFolder}
        alt="empty folder"
      />
      <h2 className="text__font-weight--700 text__line-height--2">
        {Messages.NoPias.H2Text.en}
      </h2>
      <p className="text__align-center text__line-height--2 text__max-width--75ch">
        {Messages.NoPias.FirstParagraph.en}
        <a href={Messages.NoPias.FirstParagraph.LinkHref}>
          {Messages.NoPias.FirstParagraph.LinkText.en}
        </a>
      </p>
      <p className="text__align-center text__line-height--2 text__max-width--75ch">
        {Messages.NoPias.SecondParagraph.en}
      </p>
    </div>
  );
};

export default EmptyPIAList;

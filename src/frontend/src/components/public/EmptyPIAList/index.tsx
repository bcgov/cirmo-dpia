import Messages from '../../../pages/PIAListPage/messages';
import EmptyFolder from '../../../assets/empty.svg';
import MDEditor from '@uiw/react-md-editor';

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
      <div className="text__align-center text__max-width--75ch margin-bottom--2em">
        <MDEditor.Markdown source={Messages.NoPias.FirstParagraph.en} />
      </div>
      <p className="text__align-center text__max-width--75ch">
        {Messages.NoPias.SecondParagraph.en}
      </p>
    </div>
  );
};

export default EmptyPIAList;

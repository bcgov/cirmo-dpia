import messages from '../../helper/messages';

export const SubmitForMPO = () => {
  return (
    <div className="section__padding-block">
      <h3>{messages.FullPIA.SubmitForMPO.heading.en}</h3>
      <div className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow  section-border-radius">
        <p>
          {messages.FullPIA.SubmitForMPO.descriptionPart1.en}
          <u>{messages.FullPIA.SubmitForMPO.descriptionPart2.en}</u>
          {messages.FullPIA.SubmitForMPO.descriptionPart3.en}
        </p>
      </div>
    </div>
  );
};

import messages from '../../helper/messages';

export const FillOutFullPIA = () => {
  return (
    <div className="section__padding-block">
      <h3>{messages.FullPIA.FillOutPIA.heading.en}</h3>
      <div className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow  section-border-radius">
        <p>{messages.FullPIA.FillOutPIA.description.en}</p>
      </div>
    </div>
  );
};

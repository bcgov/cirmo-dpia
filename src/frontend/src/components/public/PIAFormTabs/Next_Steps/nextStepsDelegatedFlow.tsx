import messages from './helper/messages';

const NextStepsDelegatedFlow = () => {
  return (
    <>
      <section className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow section__margin-block  section-border-radius">
        <h3>{messages.Delegated.heading.en}</h3>
        <p>{messages.Delegated.description.en}</p>
        <p>
          <div>{messages.Delegated.helpline.title.en}</div>
          <div>
            <a href={`tel:${messages.Delegated.helpline.telephone.en} `}>
              {messages.Delegated.helpline.telephone.en}
            </a>
          </div>
          <div>
            <a href={`mailto:${messages.Delegated.helpline.email.en} `}>
              {messages.Delegated.helpline.email.en}
            </a>
          </div>
        </p>
      </section>
    </>
  );
};

export default NextStepsDelegatedFlow;

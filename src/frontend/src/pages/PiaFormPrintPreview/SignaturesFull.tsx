import MessageSignatures from './MessageSignatures';
import SignatureSection from './SignatureSection';
import { ISignatureBlock } from './interface';

const SignaturesFullPIA = () => {
  function getSignatureSection(key: string): ISignatureBlock | null {
    if (key in MessageSignatures.Signatures) {
      return Object(Object(MessageSignatures.Signatures)[key]);
    }
    return null;
  }
  return (
    <div className="signatures">
      <h2>Signatures</h2>
      {Object.keys(MessageSignatures.Signatures).map((key: string, id) => {
        const signatureBlockProps: ISignatureBlock | null =
          getSignatureSection(key);
        if (!signatureBlockProps) return null;
        return <SignatureSection {...signatureBlockProps} key={id} />;
      })}
    </div>
  );
};

export default SignaturesFullPIA;

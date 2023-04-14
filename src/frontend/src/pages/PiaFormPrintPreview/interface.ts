/*
 * The interface file for the PiaFormPrintPreview component is
 * for the signature section of the form. This is where the
 * signature block interface is defined.
 *
 * It can be exted to include more features that are only/custom avalable
 * in the print mode. Signature is one of those examples.
 */

/*
 * The signature block interface is used to define the signature block
 * for the form. It is used to define the title, roles, and comments
 * for the signature block.
 *
 * The data can be found in the MessageSignatures.ts file.
 */
export interface ISignatureBlock {
  title: {
    en: string;
  };
  roles?: {
    [key: string]: {
      title: {
        en: string;
      };
      subTitle?: {
        en: string;
      };
    };
  };
  comments?: {
    title: {
      en: string;
    };
  };
}

export interface ItextType {
  text: string;
}

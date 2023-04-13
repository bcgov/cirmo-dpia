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

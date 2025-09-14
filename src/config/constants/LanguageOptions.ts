import { ILanguage } from "@/types";

type Option = {
  label: string;
  value: ILanguage;
};

export const LanguageOptions: Option[] = [
  { label: "Uzbek", value: ILanguage.UZBEK },
  { label: "Russian", value: ILanguage.RUSSIAN },
  { label: "English", value: ILanguage.ENGLISH },
  { label: "Kazakh", value: ILanguage.KAZAKH },
  { label: "Kyrgyz", value: ILanguage.KYRGYZ },
  { label: "Tajik", value: ILanguage.TADJIK },
  { label: "Chinese", value: ILanguage.CHINESE },
];

import { ILanguage, LanguageLevel, IUserRole } from "@/types";

export const languageOptions = [
  { value: ILanguage.UZBEK, label: "Uzbek" },
  { value: ILanguage.RUSSIAN, label: "Russian" },
  { value: ILanguage.ENGLISH, label: "English" },
  { value: ILanguage.KAZAKH, label: "Kazakh" },
  { value: ILanguage.KYRGYZ, label: "Kyrgyz" },
  { value: ILanguage.TADJIK, label: "Tajik" },
  { value: ILanguage.CHINESE, label: "Chinese" },
];

export const levelOptions = [
  { value: LanguageLevel.A1, label: "A1 - Beginner" },
  { value: LanguageLevel.A2, label: "A2 - Elementary" },
  { value: LanguageLevel.B1, label: "B1 - Intermediate" },
  { value: LanguageLevel.B2, label: "B2 - Upper Intermediate" },
  { value: LanguageLevel.C1, label: "C1 - Advanced" },
  { value: LanguageLevel.C2, label: "C2 - Proficient" },
];

export const roleOptions = [
  { value: IUserRole.STUDENT, label: "Student - Learn languages" },
  { value: IUserRole.TUTOR, label: "Tutor - Help others learn" },
];

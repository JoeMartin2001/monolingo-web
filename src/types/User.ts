// Enum for CEFR levels
export enum LanguageLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export enum ILanguage {
  UZBEK = "uz",
  RUSSIAN = "ru",
  ENGLISH = "en",
  KAZAKH = "kk",
  KYRGYZ = "ky",
  TADJIK = "tj",
  CHINESE = "zh",
}

// User account
export interface IUser {
  id: string;
  email: string;
  username: string;
  nativeLanguage: ILanguage; // e.g., "uz", "en"
  targetLanguage: ILanguage; // e.g., "en", "de"
  level: LanguageLevel; // starting level (A1–C2)

  bio?: string;
  avatarUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}

export enum IUserRole {
  STUDENT = "student",
  TUTOR = "tutor",
}

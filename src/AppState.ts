import { Datas } from "./Models/Datas/Datas";

export interface AppState {
  isLoading: boolean;
  APIs: Datas;
  filters: SearchFilters;
  setFiltersValue: (value: SearchFilters) => void;
  i18n: {
    changeLanguage: (lang: string) => void;
  };
}

export interface SearchFilters {
  query: string;
  categories: string[];
  https: boolean;
  cors: boolean;
  auth: boolean;
}

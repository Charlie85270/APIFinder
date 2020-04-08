import React from "react";

import { AppState, SearchFilters } from "./AppState";

export default React.createContext<AppState>({
  APIs: { count: 0, entries: [] },
  isLoading: false,
  filters: {
    query: "",
    categories: [],
    https: false,
    cors: false,
    auth: false
  },
  setFiltersValue: (value: SearchFilters) => {}
});

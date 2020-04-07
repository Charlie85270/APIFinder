import { Api } from "../Models/Api/Api";
import { SearchFilters } from "../AppState";
import { isEqual } from "lodash";

export default class Utils {
  static getAllCategories(data: Api[]): string[] {
    const categories: string[] = [];
    if (data) {
      data.forEach(element => {
        if (!categories.includes(element.Category)) {
          categories.push(element.Category);
        }
      });
    }
    return categories.sort();
  }

  static getNubmerApisByCategory = (category: string, data: Api[]): number => {
    return data.filter(element => category === element.Category).length;
  };

  static sortApiByName = (api: Api[]): Api[] => {
    function compare(a: Api, b: Api) {
      if (a.API < b.API) {
        return -1;
      }
      if (a.API > b.API) {
        return 1;
      }
      return 0;
    }

    return api.sort(compare);
  };

  static getImageFromCategory = (category: string) => {
    return `/category/${category.replace(/ /g, "").toLocaleLowerCase()}.jpg`;
  };

  static getIconeFromCategory = (category: string) => {
    return `/category/${category.replace(/ /g, "").toLocaleLowerCase()}.svg`;
  };

  static filtersHaveChanged = (
    filtersA: SearchFilters,
    filtersB: SearchFilters
  ) => {
    return (
      !isEqual(filtersA, filtersB) ||
      filtersA.categories.length !== filtersB.categories.length
    );
  };

  static getFilteredApis(data: Api[], filters: SearchFilters): Api[] {
    // Filtred api by category
    let apis =
      filters.categories.length > 0
        ? data.filter(api => filters.categories.includes(api.Category))
        : data;

    // Filtred api by https
    if (filters.https) {
      apis = apis.filter(api => api.HTTPS);
    }

    // Filtred api by auth
    if (filters.auth) {
      apis = apis.filter(api => api.Auth);
    }

    // Filtred api by cors
    if (filters.cors) {
      apis = apis.filter(api => api.Cors);
    }

    // Filtred api by qury
    if (filters.query) {
      apis = apis.filter(
        api =>
          api.API.toLowerCase().includes(filters.query.toLowerCase()) ||
          api.Description.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    return apis;
  }

  static truncateString(str: string, num: number) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num).concat("...");
  }
  static getDomainNameFromUrl = (url: string) => {
    return new URL(url).hostname;
  };
}

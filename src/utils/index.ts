/**
 *
 * @param urlSearchParams
 * @returns {data}
 */
async function getData(urlSearchParams: URLSearchParams) {
  const BASE_URL = `https://www.alphavantage.co/query?`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  urlSearchParams.append("apikey", API_KEY);
  const data = await fetch(BASE_URL + urlSearchParams.toString());
  const response = await data.json();
  return response;
}

/**
 *
 * @returns {top_gainers, top_losers}
 */
export async function getGainersAndLosers() {
  const urlSearchParams = new URLSearchParams({
    function: "TOP_GAINERS_LOSERS",
  });
  const { top_gainers, top_losers } = await getData(urlSearchParams);
  return { top_gainers, top_losers };
}

/**
 *
 * @param {string} symbol
 * @returns {data}
 */
export async function getCompanyOverview(symbol: string) {
  const urlSearchParams = new URLSearchParams({
    function: "OVERVIEW",
    symbol,
  });
  const data = await getData(urlSearchParams);
  return data;
}

/**
 *
 * @param {string} keywords
 * @returns {data}
 */
export async function getSearchResults(keywords: string) {
  const urlSearchParams = new URLSearchParams({
    function: "SYMBOL_SEARCH",
    keywords,
  });
  const data = await getData(urlSearchParams);
  return data.bestMatches;
}

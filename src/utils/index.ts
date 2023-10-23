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
  // Check if data is cached
  const cachedGainersAndLosers = getCachedResponse("cachedGainersAndLosers");
  if (cachedGainersAndLosers) {
    return cachedGainersAndLosers;
  }
  // if not cached, fetch data and cache it
  const { top_gainers, top_losers } = await getData(urlSearchParams);
  cacheResponse("cachedGainersAndLosers", {
    top_gainers,
    top_losers,
    last_updated: new Date().getTime(),
  });
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
  // Check if data is cached
  const cachedCompanyOverview = getCachedResponse("cachedCompanyOverview");
  if (cachedCompanyOverview) {
    return cachedCompanyOverview;
  }
  // if not cached, fetch data and cache it
  const data = await getData(urlSearchParams);
  cacheResponse("cachedCompanyOverview", {
    ...data,
    last_updated: new Date().getTime(),
  });
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

function getCachedResponse(name: string) {
  const cachedResponse = localStorage.getItem(name);
  if (cachedResponse) {
    const { last_updated, ...rest } = JSON.parse(cachedResponse);
    const currentTime = new Date().getTime();
    if (currentTime - last_updated > 1000 * 60 * 60 * 24) {
      return null;
    }
    return rest;
  }
  return null;
}

function cacheResponse(name: string, data: any) {
  localStorage.setItem(name, JSON.stringify(data));
}

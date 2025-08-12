async function search(
  pagination,
  searchValue,
  minBeds,
  maxBeds,
  minBathrooms,
  maxBathrooms,
  minPrice,
  maxPrice,
  neLat,
  neLong,
  swLat,
  swLong,
  zoomValue,
  filterState,
  proxyUrl = null
) {
  const headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  };

  const inputData = {
    searchQueryState: {
      isMapVisible: true,
      isListVisible: true,
      mapBounds: {
        north: neLat,
        east: neLong,
        south: swLat,
        west: swLong,
      },
      filterState,
      mapZoom: zoomValue,
      pagination: {
        currentPage: pagination,
      },
    },
    wants: { cat1: ["listResults", "mapResults"], cat2: ["total"] },
    requestId: 10,
    isDebugRequest: false,
  };

  if (searchValue != null) {
    inputData.searchQueryState.usersSearchTerm = searchValue;
  }

  if (minBeds != null || maxBeds != null) {
    const beds = {};
    if (minBeds != null) beds.min = minBeds;
    if (maxBeds != null) beds.max = maxBeds;
    inputData.searchQueryState.filterState.beds = beds;
  }

  if (minBathrooms != null || maxBathrooms != null) {
    const baths = {};
    if (minBathrooms != null) baths.min = minBathrooms;
    if (maxBathrooms != null) baths.max = maxBathrooms;
    inputData.searchQueryState.filterState.baths = baths;
  }

  if (minPrice != null || maxPrice != null) {
    const price = {};
    if (minPrice != null) price.min = minPrice;
    if (maxPrice != null) price.max = maxPrice;
    inputData.searchQueryState.filterState.price = price;
  }

  const res = await fetch('https://www.zillow.com/async-create-search-page-state', {
    method: 'PUT',
    headers,
    body: JSON.stringify(inputData)
  });
  const data = await res.json();
  return data?.cat1?.searchResults ?? {};
}

function forSale(
  pagination,
  searchValue,
  minBeds,
  maxBeds,
  minBathrooms,
  maxBathrooms,
  minPrice,
  maxPrice,
  neLat,
  neLong,
  swLat,
  swLong,
  zoomValue,
  proxyUrl = null
) {
  const rent = {
    sortSelection: { value: 'globalrelevanceex' },
    isAllHomes: { value: true },
  };
  return search(pagination, searchValue, minBeds, maxBeds, minBathrooms, maxBathrooms, minPrice, maxPrice, neLat, neLong, swLat, swLong, zoomValue, rent, proxyUrl);
}

function forRent(
  pagination,
  searchValue,
  isEntirePlace,
  isRoom,
  minBeds,
  maxBeds,
  minBathrooms,
  maxBathrooms,
  minPrice,
  maxPrice,
  neLat,
  neLong,
  swLat,
  swLong,
  zoomValue,
  proxyUrl = null
) {
  const rent = {
    sortSelection: { value: 'priorityscore' },
    isNewConstruction: { value: false },
    isForSaleForeclosure: { value: false },
    isForSaleByOwner: { value: false },
    isForSaleByAgent: { value: false },
    isForRent: { value: true },
    isComingSoon: { value: false },
    isAuction: { value: false },
    isAllHomes: { value: true },
  };
  if (isRoom) rent.isRoomForRent = { value: true };
  if (!isEntirePlace) rent.isEntirePlaceForRent = { value: false };
  return search(pagination, searchValue, minBeds, maxBeds, minBathrooms, maxBathrooms, minPrice, maxPrice, neLat, neLong, swLat, swLong, zoomValue, rent, proxyUrl);
}

function sold(
  pagination,
  searchValue,
  minBeds,
  maxBeds,
  minBathrooms,
  maxBathrooms,
  minPrice,
  maxPrice,
  neLat,
  neLong,
  swLat,
  swLong,
  zoomValue,
  proxyUrl = null
) {
  const rent = {
    sortSelection: { value: 'globalrelevanceex' },
    isNewConstruction: { value: false },
    isForSaleForeclosure: { value: false },
    isForSaleByOwner: { value: false },
    isForSaleByAgent: { value: false },
    isForRent: { value: false },
    isComingSoon: { value: false },
    isAuction: { value: false },
    isAllHomes: { value: true },
    isRecentlySold: { value: true },
  };
  return search(pagination, searchValue, minBeds, maxBeds, minBathrooms, maxBathrooms, minPrice, maxPrice, neLat, neLong, swLat, swLong, zoomValue, rent, proxyUrl);
}

module.exports = { search, forSale, forRent, sold };

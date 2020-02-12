const mappingFilters = {
    top_brands: "brand",
    top_categories: "product_type"
  };
  
  
  const nostoDataToOptionalFilters = data =>
      Object.keys(data).reduce(
        (acc1, key1) => [
          ...acc1,
          ...Object.keys(data[key1]).reduce(
            (acc2, key2) => [
              ...acc2,
              `${mappingFilters[key1]}:${key2}<score=${Math.round(
                data[key1][key2] * 1000
              )}>`
            ],
            []
          )
        ],
        []
      );

export function getNostoAffinityData() {
    return new Promise(resolve => {
        nostojs(api =>
            api.listen("prerender", data => {
                let myOptionalFilters = nostoDataToOptionalFilters(data.affinityScores)
                resolve(myOptionalFilters);
            })
        );
        nostojs(api => api.loadRecommendations())
    });
}
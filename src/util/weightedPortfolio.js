export const getBasketPortfolio = (schemes = [], funds) => {
  let portfolioMap = {};
  let totalWt = 0;
  schemes.map((v) => {
    if (!funds.hasOwnProperty(v.name)) {
      return;
    }
    const f = funds[v.name];
    const wt = v.wt;
    totalWt += wt;
    f.portfolio.map((c) => {
      if (!portfolioMap.hasOwnProperty(c.stock)) {
        portfolioMap[c.stock] = 0;
      }
      portfolioMap[c.stock] += wt * c.wt;
    });
  });
  let portfolio = [];
  Object.keys(portfolioMap).forEach((key, index) => {
    portfolio.push({ stock: key, wt: portfolioMap[key] / totalWt });
  });
  console.log("portfolio", portfolio);
  return portfolio;
};

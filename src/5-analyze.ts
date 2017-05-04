type ranking = {rank:string, boy: string, girl: string};
(async () => {
  const name = process.argv[2];
  
  let highestRank = null;
  for (let year = 1880; year < 2018; year++) {
    const nameRanks: ranking[] = require(`../data/${year}.json`); 
    
    const boyMatch = nameRanks.find(b => b.boy === name);
    const girlMatch = nameRanks.find(g => g.girl === name);

    if (boyMatch || girlMatch) {
      if (boyMatch && (highestRank === null || parseInt(boyMatch.rank) < highestRank.rank)) { highestRank = { year, rank: parseInt(boyMatch.rank)} }
      if (girlMatch && (highestRank === null || parseInt(girlMatch.rank) < highestRank.rank)) { highestRank = { year, rank: parseInt(girlMatch.rank)} }
      const boyMatchStr = boyMatch && ` Boy: ${boyMatch.rank}` || '';
      const girlMatchStr = girlMatch && ` Girl: ${girlMatch.rank}` || '';
      console.log(`${year}:${boyMatchStr}${girlMatchStr}`);
    }
  }
  if (highestRank) {
    console.log(`Peak ${name}: ${highestRank.year} Rank: ${highestRank.rank}`);
  } else {
    console.log(`Name not found, whoa.`);
  }
})();

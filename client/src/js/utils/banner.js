module.exports = {
  appearances(dataset) {
    var games = [];
    dataset.map(d => {
      if (games.findIndex((element) => element === d.gameDate) === -1) {
        games.push(d.gameDate);
      }
    });

    return games.length;
  },

  avgPitchCount(appearances, pitches) {
    return Math.round(pitches / appearances);
  }
}

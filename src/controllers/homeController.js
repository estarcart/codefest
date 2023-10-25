exports.index = (req, res) => {
    res.sendFile('views/index.html', { root: __dirname + '/../' });
  };
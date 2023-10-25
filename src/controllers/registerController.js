exports.register = (req, res) => {
    res.sendFile('views/register.html', { root: __dirname + '/../' });
  };
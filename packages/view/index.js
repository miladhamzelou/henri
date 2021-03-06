const path = require('path');
const next = require(path.resolve(process.cwd(), 'node_modules', 'next'));
const url = require('url');
const { app } = henri;
const dev = process.env.NODE_ENV !== 'production';

const reactView = next({
  dir: path.resolve('./app/views'),
  dev
});

if (!global['henri']) {
  global['henri'] = {};
}

app.use((req, res, next) => {
  res.locals._req = req;
  res.render = (route, data) => {
    const opts = {
      data,
      query: req.query
    };
    if (req.url.startsWith('/_data/')) {
      return res.json(data);
    }
    reactView.render(req, res, route, opts);
  };
  next();
});

global['henri'].next = reactView;

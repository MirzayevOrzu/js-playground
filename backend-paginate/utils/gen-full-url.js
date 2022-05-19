import * as conf from './config.cjs';

const generateFullUrl = (req, res, next) => {
  req.fullUrl = '';
  req.fullUrl += req.protocol;
  req.fullUrl += '://';
  req.fullUrl += req.hostname;
  req.fullUrl +=
    conf.default.env === 'development' ? `:${conf.default.port}` : '';
  req.fullUrl += req.path;
  next();
};

export default generateFullUrl;

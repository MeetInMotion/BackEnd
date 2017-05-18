import proj4 from 'proj4';
proj4.defs([
  [
    'WGS84',
    "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
  ],
  [
    'RT90',
    '+proj=tmerc +lat_0=0 +lon_0=15.80827777777778 +k=1 +x_0=1500000 +y_0=0 +ellps=bessel +towgs84=414.1,41.3,603.1,-0.855,2.141,-7.023,0 +units=m +no_defs',
  ],
]);

module.exports = function(x, y){
  var result = proj4('RT90', 'WGS84', [y, x]);
  return {"east": result[0], "north": result[1]};
};

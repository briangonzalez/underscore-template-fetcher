
_.fetchTemplate = function(name, namespace, extension){

  var templatePath;

  if ( name.substring(0,1) === "/" ){
    templatePath = name;
  }
  else{
    var settings  = _.templateFetcherSettings(); 
    var path      = namespace ? settings.namespaces[namespace] : settings.namespaces.default;
    var extension = (typeof extension === 'undefined') ? settings.extension : extension;
    templatePath  = [path, name, extension].join('');
  }

  this.templateFetcherSettingsCache.cache = this.templateFetcherSettingsCache.cache || {};
  if ( templatePath in this.templateFetcherSettingsCache.cache )
    return this.templateFetcherSettingsCache.cache[templatePath];

  // AJAX request to get the template
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", templatePath, false );
  xmlHttp.send( null );
  var t = xmlHttp.responseText;

  this.templateFetcherSettingsCache.cache[templatePath] = t;
  return t;
}

_.templateFetcherSettings = function(opts){

  this.templateFetcherSettingsCache = this.templateFetcherSettingsCache || {}

  var returnThis  = (typeof opts === 'undefined');
  var opts        = opts || {}
  var namespaces  = this.templateFetcherSettingsCache.namespaces || { default: '/templates/' };

  this.templateFetcherSettingsCache.namespaces  = _.extend( namespaces, opts.namespaces || {} );
  this.templateFetcherSettingsCache.extension   = opts.extension || this.templateFetcherSettingsCache.extension || '.jst';

  if ( returnThis )
      return this.templateFetcherSettingsCache;
}

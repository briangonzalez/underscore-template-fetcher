
$(document).ready(function(){

  test( "Defaults as expected", function() {
    equal( '.jst',          _.templateFetcherSettings().extension );
    equal( '/templates/',   _.templateFetcherSettings().namespaces.default );
  });

  test( "Template fetcher settings", function() {
    _.templateFetcherSettings({
      namespaces: {
        default:    '/my-templates/',
        hovercard:  '/templates/hovercard/',
        dialog:     '/plugins/dialogs/'
      },
      extension:  '.tmpl'
    })

    equal( '.tmpl',                 _.templateFetcherSettings().extension );
    equal( '/my-templates/',        _.templateFetcherSettings().namespaces.default );
    equal( '/templates/hovercard/', _.templateFetcherSettings().namespaces.hovercard );
    equal( '/plugins/dialogs/',     _.templateFetcherSettings().namespaces.dialog );
  });

  test( "Fetching a template", function() {
    _.templateFetcherSettings({ 
      namespaces: {
        default: '/templates/'
      },
      extension: '.jst' 
    });

    var raw = _.fetchTemplate('strong');
    var t   = _.template(raw);
    t       = t({ text: 'woot' });
    equal(
        "The following text will be strong: <strong>woot</strong>",
        t
      )

    var raw = _.fetchTemplate("/templates/simple.jst")
    equal(
        "Test.",
        raw
      )
  });

  test( "Template was cached", function() {
    _.templateFetcherSettings({ 
      namespaces: {
        default: '/templates/'
      },
      extension: '.jst' 
    });
    
    var path  = "/templates/one-request.jst"
    var t     = _.fetchTemplate('one-request');

    equal( t, _.templateFetcherSettings().cache[path] )
  });

  test( "Namespaced template", function() {
    _.templateFetcherSettings({
      namespaces: {
        superNested: '/templates/super/nested/',
      },
      extension: '.jst'
    })

    var t = _.fetchTemplate('namespaced-template', 'superNested');
    
    t     = _.template(t, { text: 'namespace' })
    equal("Hello, namespace!", t)
  });

});
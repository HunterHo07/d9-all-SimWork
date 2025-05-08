// GitHub Pages SPA routing fix
// This script handles the redirect from 404.html
(function() {
  // Parse the URL
  var l = window.location;
  
  // Check if we need to redirect
  if (l.search) {
    var q = {};
    l.search.slice(1).split('&').forEach(function(v) {
      var a = v.split('=');
      q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
    });
    
    // If we have a path parameter, redirect to it
    if (q.p !== undefined) {
      // Remove the query parameters
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + (q.p || '') +
        (q.q ? ('?' + q.q) : '') +
        l.hash
      );
    }
  }
}());

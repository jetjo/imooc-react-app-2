// lazy-load-depend.js
const domMutationObsConf = { attributes: false, childList: true, subtree: true };

const domObs = new MutationObserver( ( mutationList ) =>
{
  for ( const mutation of mutationList )
  {

    console.log( 'dom node update: ', mutation );
  }
} );

domObs.observe( window.document.body, domMutationObsConf );

window.addEventListener( 'unload', () =>
{
  window.alert( 'unload?' );
  domObs.disconnect();
} );

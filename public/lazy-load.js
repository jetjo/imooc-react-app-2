"use strict";

function lazyLoad ( _a )
{
  var $img = _a.$img, setStyle = _a.setStyle, whenCanSetStyle = _a.whenCanSetStyle;
  function imgLoadedHandler ()
  {
    function transitionHandler ()
    {
      // if ($img?.tagName === 'H1') debugger
      // window.alert( $img === this );
      // window.alert($img instanceof window.EventTarget);
      if ( !$img || !setStyle )
      {
        if ( this instanceof window.EventTarget &&
          this.style instanceof window.CSSStyleDeclaration )
        {
          this.removeEventListener( "transitionend", transitionHandler );
          setStyle && setStyle( this.style, isError );
          this.style.opacity = "1";
        }
        throw new Error( 'something is wrong!!!' );
      }
      $img.removeEventListener( "transitionend", transitionHandler );
      setStyle( $img.style, isError );
      $img.style.opacity = "1";
    }
    // if (!$img || isError) return;
    if ( !$img || isError )
      throw new Error( "imgLoadedHandler函数必须传入$img参数！" ); // TODO: $img如果是空，就不应该执行到此处！！！
    $img.addEventListener( "transitionend", transitionHandler );
    $img.style.opacity = "0";
    // window.alert('开始过渡效果...')
  }
  var loaded = false, handled = false, mounted = false, isError = false;
  whenCanSetStyle &&
    whenCanSetStyle()[ "catch" ]( function ()
    {
      isError = true;
    } )
      .then( function ()
      {
        loaded = true;
        if ( handled || !mounted )
          return;
        imgLoadedHandler();
        handled = true;
      } );
  function lazyLoad ( _a )
  {
    if ( $img ) throw new Error( '不支持给非空的节点引用$img重新赋值！' );
    var $imgNew = _a.$img, setStyleNew = _a.setStyle;
    if ( !$imgNew )
      throw new Error( 'lazyLoad函数必须传入$img参数！' );
    // if ($img) return;// 不会发生，即使由值也需要更新，因为可能不是一个节点了
    $img = $imgNew;
    setStyle = setStyleNew;
    mounted = true;
    // if (handled || !loaded) return !$img ? lazyLoad : undefined;
    if ( !handled && loaded )
    {
      imgLoadedHandler();
      handled = true;
    }
    return lazyLoad; // if (!$img)
  }
  return lazyLoad; // if (!$img)
}

function imgLazyLoad ()
{
  function setStyle ( style, $img, src, isError )
  {
    if ( isError )
      return;
    if ( style )
    {
      style.backgroundImage = "url(".concat( src, ")" );
      return;
    }
    $img && ( $img.style.backgroundImage = "url(".concat( src, ")" ) );
  }
  function whenCanSetStyle ( src )
  {
    return new Promise( function ( res, rej )
    {
      if ( !src )
        throw new Error( "src 不能为空！" );
      var img = new Image();
      img.addEventListener( "load", function () { return !_isLazyLoaded && ( ( _isLazyLoaded = true ), res() ); } );
      img.addEventListener( "error", function () { return !_isLazyLoaded && ( ( _isLazyLoaded = true ), rej() ); } );
      img.src = src;
    } );
  }
  function loadImg ( $img, src )
  {
    // if (!_lazyLoad)
    if ( !isLazyLoaded )
    {
      // !isLazyLoaded &&
      //     // (isLazyLoaded = true) &&
      _lazyLoad = lazyLoad( {
        whenCanSetStyle: function () { return whenCanSetStyle( src ); }
      } );
      isLazyLoaded = true;
    }
    else
    {
      $img &&
        _lazyLoad &&
        _lazyLoad( {
          $img: $img,
          setStyle: function ( style, isError ) { return setStyle( style, $img, src, isError ); }
        } );
    }
  }
  var _lazyLoad;
  var isLazyLoaded = false;
  var _isLazyLoaded = false;
  // let setStyle: ReturnType<typeof imgLazyLoad>['setStyle'];
  // let whenCanSetStyle: ReturnType<typeof imgLazyLoad>['whenCanSetStyle'];
  return Object.freeze( { loadImg: loadImg, isLazyLoaded: function () { return _isLazyLoaded; } } );
}

function webFontLazyLoad ( loadedClassName, loadedStyle )
{
  if ( loadedStyle === void 0 ) { loadedStyle = {}; }
  function setStyle ( style, $ele, fontFamilyName, fontError )
  {
    if ( fontError || !fontFamilyName )
      return;
    if ( style )
    {
      style.fontFamily = fontFamilyName;
      Object.assign( style, loadedStyle );
    }
    if ( $ele )
    {
      $ele.style.fontFamily = fontFamilyName;
      $ele.classList.add( loadedClassName );
    }
  }
  function whenCanSetStyle ( fontFamilyName, testText, opts )
  {
    if ( testText === void 0 ) { testText = null; }
    if ( opts === void 0 ) { opts = { weight: 'bold', size: '5rem' }; }
    return new Promise( function ( res, rej )
    {
      if ( !fontFamilyName )
        throw new Error( "fontFamilyName 不能为空！" );
      // const font = new FontFaceObserver(fontFamilyName, opts);
      // font.load(testText, 9000); //, 5000)
      if ( sessionStorage.getItem( fontFamilyName ) )
      {
        _isLazyLoaded = true;
        res();
        return;
      }
      if ( !( 'fonts' in document ) )
        return rej( '低版本浏览器不支持document.fonts属性！' );
      document.fonts
        .load( "".concat( opts.weight, " " ).concat( opts.size, " '" ).concat( fontFamilyName, "'" ) )
        .then( function ( fontFace )
        {
          console.log( { fontFace: fontFace } );
          sessionStorage.setItem( fontFamilyName, '1' );
          res();
        } )[ "catch" ]( function ( err )
        {
          console.error( err );
          rej( err );
        } )[ "finally" ]( function ()
        {
          _isLazyLoaded = true;
        } );
    } );
  }
  function loadFont ( $ele, fontFamilyName, testText )
  {
    if ( !isLazyLoad )
    {
      _lazyLoad = lazyLoad( {
        whenCanSetStyle: function () { return whenCanSetStyle( fontFamilyName, testText ); }
      } );
      isLazyLoad = true;
    }
    else
    {
      _lazyLoad( {
        $img: $ele,
        setStyle: function ( style, fontError )
        {
          return setStyle( style, $ele, fontFamilyName, fontError );
        }
      } );
    }
  }
  var _lazyLoad;
  var isLazyLoad = false;
  var _isLazyLoaded = false;
  return Object.freeze( { loadFont: loadFont, isLazyLoad: function () { return _isLazyLoaded; } } );
}


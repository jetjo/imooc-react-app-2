import FontFaceObserver from "fontfaceobserver";

type lazyLoadArg = {
  $img?: HTMLElement | null;
  setStyle?: (style?: CSSStyleDeclaration, resourceError?: boolean) => void;
  whenCanSetStyle?: () => Promise<void>;
};

function lazyLoad({ $img, setStyle, whenCanSetStyle }: lazyLoadArg) {
  function imgLoadedHandler() {
    function transitionHandler() {
      // if ($img?.tagName === 'H1')
      // {
      //   debugger
      // }
      if (!$img || !setStyle) return;
      $img.removeEventListener("transitionend", transitionHandler);
      setStyle($img.style, isError);
      $img.style.opacity = `1`;
    }
    // if (!$img || isError) return;
    if (!$img || isError)
      throw new Error("imgLoadedHandler函数必须传入$img参数！"); // TODO: $img如果是空，就不应该执行到此处！！！
    $img.addEventListener("transitionend", transitionHandler);
    $img.style.opacity = `0`;
  }

  let loaded = false,
    handled = false,
    mounted = false,
    isError = false;
  whenCanSetStyle &&
    whenCanSetStyle()
      .catch(() => {
        isError = true;
      })
      .then(() => {
        loaded = true;
        if (handled || !mounted) return;
        imgLoadedHandler();
        handled = true;
      });

  function lazyLoad({ $img: $imgNew, setStyle: setStyleNew }: lazyLoadArg)
  {
    if (!$imgNew) throw new Error('lazyLoad函数必须传入$img参数！');
    // if ($img) return;// 不会发生，即使由值也需要更新，因为可能不是一个节点了
    $img = $imgNew;
    setStyle = setStyleNew;
    mounted = true;
    // if (handled || !loaded) return !$img ? lazyLoad : undefined;
    if (!handled && loaded) {
      imgLoadedHandler();
      handled = true;
    }
    return lazyLoad; // if (!$img)
  }
  return lazyLoad; // if (!$img)
}

function imgLazyLoad() {
  function setStyle(style, $img, src, isError)
  {
    if (isError) return;
    if (style) {
      style.backgroundImage = `url(${src})`;
      return;
    }
    $img && ($img.style.backgroundImage = `url(${src})`);
  }

  function whenCanSetStyle(src) {
    return new Promise<void>((res, rej) => {
      if (!src) throw new Error("src 不能为空！");
      const img = new Image();
      img.addEventListener(
        "load",
        () => !_isLazyLoaded && ((_isLazyLoaded = true), res())
      );
      img.addEventListener(
        "error",
        () => !_isLazyLoaded && ((_isLazyLoaded = true), rej())
      );
      img.src = src;
    });
  }

  function loadImg($img, src) {
    // if (!_lazyLoad)
    if (!isLazyLoaded) {
      // !isLazyLoaded &&
      //     // (isLazyLoaded = true) &&
      _lazyLoad = lazyLoad({
        whenCanSetStyle: () => whenCanSetStyle(src),
      });
      isLazyLoaded = true;
    } else {
      $img &&
        _lazyLoad &&
        _lazyLoad({
          $img,
          setStyle: (style, isError) => setStyle(style, $img, src, isError),
        });
    }
  }
  let _lazyLoad: typeof lazyLoad;
  let isLazyLoaded: boolean = false;
  let _isLazyLoaded: boolean = false;
  // let setStyle: ReturnType<typeof imgLazyLoad>['setStyle'];
  // let whenCanSetStyle: ReturnType<typeof imgLazyLoad>['whenCanSetStyle'];
  return Object.freeze({ loadImg, isLazyLoaded: () => _isLazyLoaded });
}

function webFontLazyLoad(loadedClassName, loadedStyle = {}) {
  function setStyle(
    style?: CSSStyleDeclaration,
    $ele?: HTMLElement | null,
    fontFamilyName?: string,
    fontError?: boolean
  )
  {
    if (fontError || !fontFamilyName) return;
    if (style) {
      style.fontFamily = fontFamilyName;
      Object.assign(style, loadedStyle);
    }
    if ($ele) {
      $ele.style.fontFamily = fontFamilyName;
      $ele.classList.add(loadedClassName);
    }
  }

  function whenCanSetStyle(
    fontFamilyName: string,
    testText: string | null = null,
    opts = { weight: 'bold', size: '5rem' }
  ) {
    return new Promise<void>((res, rej) =>
    {
      if (!fontFamilyName) throw new Error("fontFamilyName 不能为空！");
      // const font = new FontFaceObserver(fontFamilyName, opts);
      // font.load(testText, 9000); //, 5000)
      if (sessionStorage.getItem(fontFamilyName))
      {
        _isLazyLoaded = true;
        res();
        return;
      }
      if (!('fonts' in document)) return rej('低版本浏览器不支持document.fonts属性！');
      document.fonts
        .load(`${opts.weight} ${opts.size} '${fontFamilyName}'`)
        .then((fontFace) => {
          console.log({ fontFace });
          sessionStorage.setItem(fontFamilyName, '1');
          res();
        })
        .catch((err) => {
          console.error(err);
          rej(err);
        })
        .finally(() => {
          _isLazyLoaded = true;
        });
    });
  }

  function loadFont($ele, fontFamilyName, testText)
  {
    if (!isLazyLoad) {
      _lazyLoad = lazyLoad({
        whenCanSetStyle: () => whenCanSetStyle(fontFamilyName, testText),
      });
      isLazyLoad = true;
    } else {
      _lazyLoad({
        $img: $ele,
        setStyle: (style, fontError) =>
          setStyle(style, $ele, fontFamilyName, fontError),
      });
    }
  }

  let _lazyLoad: typeof lazyLoad;
  let isLazyLoad = false;
  let _isLazyLoaded = false;
  return Object.freeze({ loadFont, isLazyLoad: () => _isLazyLoaded });
}

export { type lazyLoadArg, lazyLoad, imgLazyLoad, webFontLazyLoad };

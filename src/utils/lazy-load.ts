// import FontFaceObserver from "fontfaceobserver";

type lazyLoadArg = {
  $img?: HTMLElement | null;
  setStyle?: (resourceError?: boolean) => void;
  whenCanSetStyle: () => Promise<void>;
};

function lazyLoad({ $img, setStyle, whenCanSetStyle }: lazyLoadArg) {
  function imgLoadedHandler() {
    function transitionHandler(this: HTMLElement | null | undefined) {
      // if ($img?.tagName === 'H1') debugger
      if (!$img || !setStyle) {
        if (
          this instanceof window.EventTarget &&
          this.style instanceof window.CSSStyleDeclaration
        ) {
          this.removeEventListener("transitionend", transitionHandler);
          setStyle && setStyle(isError);
          this.style.opacity = "1";
        }
        throw new Error("something is wrong!!!");
      }
      $img.removeEventListener("transitionend", transitionHandler);
      setStyle(isError);
      $img.style.opacity = `1`;
    }
    if (isError)
      throw Error("资源预加载失败！", {
        cause: {
          $img,
          setStyle,
          whenCanSetStyle,
          loaded,
          handled,
          mounted,
          isError,
        },
      });
    if (!$img) throw new Error("imgLoadedHandler函数必须传入$img参数！"); // TODO: $img如果是空，就不应该执行到此处！！！
    setTimeout(() => {
      transitionHandler.call($img);
    }, 500);
    $img.addEventListener("transitionend", transitionHandler);
    $img.style.opacity = `0`;
  }

  let loaded = false,
    handled = false,
    mounted = false,
    isError = false;
  // whenCanSetStyle &&
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

  function lazyLoad({
    $img: $imgNew,
    setStyle: setStyleNew,
  }: Omit<lazyLoadArg, "whenCanSetStyle">) {
    if ($img) throw new Error("不支持给非空的节点引用$img重新赋值！");
    if (!$imgNew) throw new Error("lazyLoad函数必须传入$img参数！");
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

function imgLazyLoad<T extends HTMLElement>(imgGet: () => T|null, src: string) {
  function setStyle($img, src, isError) {
    if (isError) return;
    // $img &&
    $img.style.backgroundImage = `url(${src})`;
  }

  function whenCanSetStyle(src) {
    return new Promise<void>((res, rej) => {
      if (!src) throw new Error("src 不能为空！");
      const img = new Image();
      img.addEventListener("load", () => {
        const $img = imgGet();
        const i = window.nodeResourceLazyLoadQueue.findIndex(
          (e) => e === nodeMutationHandler
        );
        if ($img && i !== -1) {
          window.nodeResourceLazyLoadQueue.splice(i, 1);
          loadImg($img, src);
        }
        res();
      });
      img.addEventListener("error", () => rej());
      img.src = src;
    });
  }

  function nodeMutationHandler(mutationRecord: MutationRecord) {
    const $img = imgGet();
    if (!$img) return;
    if (
      mutationRecord.type !== "childList" ||
      !(mutationRecord.addedNodes.length > 0)
    )
      return;

    for (const node of mutationRecord.addedNodes) {
      if (node instanceof HTMLElement && node.contains($img)) {
        loadImg($img, src);
        const i = window.nodeResourceLazyLoadQueue.findIndex(
          (e) => e === nodeMutationHandler
        );
        // setTimeout(() => {
        // 这个Handler是在for循环中调用的，如果同步删除，会导致后面紧接着的Handler无法执行
        window.nodeResourceLazyLoadQueue.splice(i, 1);
        // }, 0);
        break;
      }
    }
  }

  function loadImg($img, src) {
    if (!$img) {
      _lazyLoad = lazyLoad({
        whenCanSetStyle: () => whenCanSetStyle(src),
      });
      window.nodeResourceLazyLoadQueue.push(nodeMutationHandler);
    } else {
      _lazyLoad &&
        _lazyLoad({
          $img,
          setStyle: (isError) => setStyle($img, src, isError),
        });
    }
  }

  let _lazyLoad: (e: Omit<lazyLoadArg, "whenCanSetStyle">) => void;

  const $img = imgGet();
  if (
    !$img ||
    ($img.style.backgroundImage.indexOf(src) === -1)
  ) {
    loadImg(null, src);
  }

  // return Object.freeze({ loadImg, isLazyLoaded: () => _isLazyLoaded });
}

function webFontLazyLoad(
  eleGet: () => HTMLElement,
  fontFamilyName,
  loadedClassName,
  loadedStyle = {}
) {
  function setStyle(
    $ele?: HTMLElement | null,
    fontFamilyName?: string,
    fontError?: boolean
  ) {
    if (fontError || !fontFamilyName) return;
    if ($ele) {
      $ele.style.fontFamily = fontFamilyName;
      $ele.classList.add(loadedClassName);
    }
  }

  function whenCanSetStyle(
    fontFamilyName: string,
    testText: string | null = null,
    opts = { weight: "bold", size: "5rem" }
  ) {
    return new Promise<void>((res, rej) => {
      if (!fontFamilyName) throw new Error("fontFamilyName 不能为空！");
      // const font = new FontFaceObserver(fontFamilyName, opts);
      // font.load(testText, 9000); //, 5000)
      if (sessionStorage.getItem(fontFamilyName)) {
        res();
      } else if (!("fonts" in document)) {
        rej("低版本浏览器不支持document.fonts属性！");
      } else {
        document.fonts
          .load(`${opts.weight} ${opts.size} '${fontFamilyName}'`)
          .then((fontFace) => {
            console.log({ fontFace });
            sessionStorage.setItem(fontFamilyName, "1");
            res();
          })
          .catch((err) => {
            console.error(err);
            rej(err);
          });
      }
    });
  }

  function nodeMutationHandler(mutationRecord: MutationRecord) {
    const $img = eleGet();
    if (!$img) return;
    if (
      mutationRecord.type !== "childList" ||
      !(mutationRecord.addedNodes.length > 0)
    )
      return;

    for (const node of mutationRecord.addedNodes) {
      if (node instanceof HTMLElement && node.contains($img)) {
        loadFont($img, fontFamilyName, null);
        const i = window.nodeResourceLazyLoadQueue.findIndex(
          (e) => e === nodeMutationHandler
        );
        window.nodeResourceLazyLoadQueue.splice(i, 1);
        break;
      }
    }
  }

  function loadFont($ele, fontFamilyName, testText) {
    if ($ele) {
      _lazyLoad = lazyLoad({
        whenCanSetStyle: () => whenCanSetStyle(fontFamilyName, testText),
      });
      window.nodeResourceLazyLoadQueue.push(nodeMutationHandler);
    } else {
      _lazyLoad({
        $img: $ele,
        setStyle: (fontError) => setStyle($ele, fontFamilyName, fontError),
      });
    }
  }

  loadFont(eleGet(), fontFamilyName, null);

  let _lazyLoad: (e: Omit<lazyLoadArg, "whenCanSetStyle">) => void;
  // return Object.freeze({ loadFont, isLazyLoad: () => _isLazyLoaded });
}

export { type lazyLoadArg, lazyLoad, imgLazyLoad, webFontLazyLoad };

(() => {
  let yOffset = window.pageYOffset;
  const sceneInfo = {
    sceneHeightNum: 5, // 브라우저 높이의 sceneHeightNum 배로 scene의 높이 세팅할 것임
    sceneHeight: 0, // scene의 높이
    videoImagesLength: 499, // videoImages의 length
    videoImages: [], // 이미지 dom 객체들을 담을 배열
    dom: {
      container: document.querySelector('#scene'),
      message1: document.querySelector('#scene .sticky-message-1'),
      message2: document.querySelector('#scene .sticky-message-2'),
      message3: document.querySelector('#scene .sticky-message-3'),
      message4: document.querySelector('#scene .sticky-message-4'),
      canvas: document.querySelector('#video-canvas'),
    },
    settings: {
      imageSequence: {startValue: 0, endValue: 498, startScroll: 0, endScroll: 1},
      canvas_opacity_out: {startValue: 1, endValue: 0, startScroll: 0.9, endScroll: 1},
      message1_opacity_in: {startValue: 0, endValue: 1, startScroll: 0.1, endScroll: 0.2},
      message1_opacity_out: {startValue: 1, endValue: 0, startScroll: 0.25, endScroll: 0.3},
      message1_translateY_in: {startValue: 20, endValue: 0, startScroll: 0.1, endScroll: 0.2},
      message1_translateY_out: {startValue: 0, endValue: -20, startScroll: 0.25, endScroll: 0.3},
      message2_opacity_in: {startValue: 0, endValue: 1, startScroll: 0.3, endScroll: 0.4},
      message2_opacity_out: {startValue: 1, endValue: 0, startScroll: 0.45, endScroll: 0.5},
      message2_translateY_in: {startValue: 20, endValue: 0, startScroll: 0.3, endScroll: 0.4},
      message2_translateY_out: {startValue: 0, endValue: -20, startScroll: 0.45, endScroll: 0.5},
      message3_opacity_in: {startValue: 0, endValue: 1, startScroll: 0.5, endScroll: 0.6},
      message3_opacity_out: {startValue: 1, endValue: 0, startScroll: 0.65, endScroll: 0.7},
      message3_translateY_in: {startValue: 20, endValue: 0, startScroll: 0.5, endScroll: 0.6},
      message3_translateY_out: {startValue: 0, endValue: -20, startScroll: 0.65, endScroll: 0.7},
      message4_opacity_in: {startValue: 0, endValue: 1, startScroll: 0.7, endScroll: 0.8},
      message4_opacity_out: {startValue: 1, endValue: 0, startScroll: 0.85, endScroll: 0.9},
      message4_translateY_in: {startValue: 20, endValue: 0, startScroll: 0.7, endScroll: 0.8},
      message4_translateY_out: {startValue: 0, endValue: -20, startScroll: 0.85, endScroll: 0.9},
    }
  };

  // 비디오 이미지 세팅
  function setVideoImages () {
    for (let i = 1; i <= sceneInfo.videoImagesLength; i++) {
      let imgElem = new Image();
      imgElem.src = `./images/sunrise/Sunrise ${i.toString().padStart(3, '0')}.jpg`;
      sceneInfo.videoImages.push(imgElem);
    }
  }

  // 크기 세팅
  function setLayoutSize () {
    const heightRatio = window.innerHeight / sceneInfo.dom.canvas.height;
    const widthRatio = window.innerWidth / sceneInfo.dom.canvas.width;

    sceneInfo.sceneHeight = sceneInfo.sceneHeightNum * window.innerHeight;
    sceneInfo.dom.container.style.height = `${sceneInfo.sceneHeight}px`;
    sceneInfo.dom.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${widthRatio > heightRatio ? widthRatio : heightRatio})`;
  }

  // 애니메이션 값 계산
  function calcValue (setting) {
    const partScrollStart = setting.startScroll * sceneInfo.sceneHeight;
    const partScrollEnd = setting.endScroll * sceneInfo.sceneHeight;
    const partScrollHeight = partScrollEnd - partScrollStart;

    if (yOffset >= partScrollStart && yOffset <= partScrollEnd) {
      return (yOffset - partScrollStart) / partScrollHeight * (setting.endValue - setting.startValue) + setting.startValue;
    } else if (yOffset < partScrollStart) {
      return setting.startValue;
    } else if (yOffset > partScrollEnd) {
      return setting.endValue;
    }
  }

  // 스크롤
  function onScroll () {
    const dom = sceneInfo.dom;
    const settings = sceneInfo.settings;
    const sceneHeight = sceneInfo.sceneHeight;
    const scrollRatio = yOffset / sceneHeight;

    let sequence = Math.round(calcValue(settings.imageSequence));
    dom.canvas.getContext('2d').drawImage(sceneInfo.videoImages[sequence], 0, 0);
    dom.canvas.style.opacity = calcValue(settings.canvas_opacity_out);

    if (scrollRatio <= 0.22) {
      dom.message1.style.opacity = calcValue(settings.message1_opacity_in);
      dom.message1.style.transform = `translate3d(0, ${calcValue(settings.message1_translateY_in)}%, 0)`;
    } else {
      dom.message1.style.opacity = calcValue(settings.message1_opacity_out);
      dom.message1.style.transform = `translate3d(0, ${calcValue(settings.message1_translateY_out)}%, 0)`;
    }

    if (scrollRatio <= 0.42) {
      dom.message2.style.opacity = calcValue(settings.message2_opacity_in);
      dom.message2.style.transform = `translate3d(0, ${calcValue(settings.message2_translateY_in)}%, 0)`;
    } else {
      dom.message2.style.opacity = calcValue(settings.message2_opacity_out);
      dom.message2.style.transform = `translate3d(0, ${calcValue(settings.message2_translateY_out)}%, 0)`;
    }

    if (scrollRatio <= 0.62) {
      dom.message3.style.opacity = calcValue(settings.message3_opacity_in);
      dom.message3.style.transform = `translate3d(0, ${calcValue(settings.message3_translateY_in)}%, 0)`;
    } else {
      dom.message3.style.opacity = calcValue(settings.message3_opacity_out);
      dom.message3.style.transform = `translate3d(0, ${calcValue(settings.message3_translateY_out)}%, 0)`;
    }

    if (scrollRatio <= 0.82) {
      dom.message4.style.opacity = calcValue(settings.message4_opacity_in);
      dom.message4.style.transform = `translate3d(0, ${calcValue(settings.message4_translateY_in)}%, 0)`;
    } else {
      dom.message4.style.opacity = calcValue(settings.message4_opacity_out);
      dom.message4.style.transform = `translate3d(0, ${calcValue(settings.message4_translateY_out)}%, 0)`;
    }
  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset; // 현재 스크롤 위치
    onScroll();
  });

  window.addEventListener('load', () => {
    setLayoutSize();
    let sequence = Math.round(calcValue(sceneInfo.settings.imageSequence));
    sceneInfo.dom.canvas.getContext('2d').drawImage(sceneInfo.videoImages[sequence], 0, 0);
  });

  window.addEventListener('resize', setLayoutSize);

  setVideoImages();
  setLayoutSize();
})();

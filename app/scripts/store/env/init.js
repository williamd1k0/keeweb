const MobileRegex = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|WPDesktop|Windows Phone|webOS/i;
const MinDesktopScreenWidth = 800;

const meta = {
    version: '@@VERSION',
    buildDate: '@@DATE',
    commit: '@@COMMIT',
};

const isDesktop = !!(global.process && global.process.versions && global.process.versions.electron);

const state = {
    meta,
    userAgent: navigator.userAgent,
    isDesktop: isDesktop,
    isMac: navigator.platform.indexOf('Mac') >= 0,
    isWindows: navigator.platform.indexOf('Win') >= 0,
    isiOS: /iPad|iPhone|iPod/i.test(navigator.userAgent),
    isMobile: MobileRegex.test(navigator.userAgent) || screen.width < MinDesktopScreenWidth,
    isPopup: !!(window.parent !== window.top || window.opener),
    isStandalone: !!navigator.standalone,
    isFrame: window.top !== window,
    isSelfHosted:
        !isDesktop &&
        !/^http(s?):\/\/((localhost:8085)|((app|beta)\.keeweb\.info))/.test(location.href),
    isBeta: /^http(s?):\/\/(beta\.keeweb\.info)/.test(location.href),
};

export default function reducer() {
    return state;
}

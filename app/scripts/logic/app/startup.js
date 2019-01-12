import Logger from '../../util/logger';
import FeatureTester from '../comp/feature-tester';
import ExportApi from '../comp/export-api';
import showAlert from '../ui/show-alert';
import settingsLoad from '../settings/load';
import runtimeLoad from '../runtime/load';
import uiSetView from '../../store/ui/set-view';
import { UiViewOpen } from '../../store/ui';

export default function startup() {
    return (dispatch, getState) => {
        const logger = new Logger('app');

        const state = getState();

        const { env } = state;
        if (env.isFrame) {
            return;
        }

        Promise.resolve()
            .then(loadConfigs)
            .then(initModules)
            .then(loadRemoteConfig)
            .then(ensureCanRun)
            .then(showApp)
            .then(postInit)
            .catch(e => {
                logger.error('Error starting app', e, e.stack);
            });

        function loadConfigs() {
            return Promise.all([
                dispatch(settingsLoad()),
                dispatch(runtimeLoad()),
                // UpdateModel.instance.load(),
                // FileInfoCollection.instance.load(),
            ]);
        }

        function initModules() {
            window.kw = ExportApi;
            // KeyHandler.init();
            // IdleTracker.init();
            // PopupNotifier.init();
            // KdbxwebInit.init();
            // return PluginManager.init();
        }

        function loadRemoteConfig() {
            return Promise.resolve().then(() => {
                // TODO
                // SettingsManager.setBySettings(appModel.settings);
                // const configParam = getConfigParam();
                // if (configParam) {
                //     return appModel
                //         .loadConfig(configParam)
                //         .then(() => {
                //             SettingsManager.setBySettings(appModel.settings);
                //         })
                //         .catch(e => {
                //             if (!appModel.settings.get('cacheConfigSettings')) {
                //                 showSettingsLoadError();
                //                 throw e;
                //             }
                //         });
                // }
            });
        }

        function ensureCanRun() {
            return FeatureTester.test().catch(e => {
                dispatch(
                    showAlert({
                        icon: 'exclamation-circle',
                        header: 'appSettingsError',
                        body: 'appNotSupportedError',
                        error: e,
                        buttons: [],
                        esc: false,
                        enter: false,
                        click: false,
                        opaque: true,
                    })
                );
                throw 'Feature testing failed: ' + e;
            });
        }

        function showApp() {
            return Promise.resolve().then(() => {
                const skipHttpsWarning =
                    localStorage.skipHttpsWarning || state.settings.skipHttpsWarning;
                const protocolIsInsecure =
                    ['https:', 'file:', 'app:'].indexOf(location.protocol) < 0;
                const hostIsInsecure = location.hostname !== 'localhost';
                if ((protocolIsInsecure && hostIsInsecure && !skipHttpsWarning) || 1) {
                    return dispatch(
                        showAlert({
                            preset: 'error',
                            header: 'appSecWarn',
                            icon: 'user-secret',
                            esc: false,
                            enter: false,
                            click: false,
                            body: ['appSecWarnBody1', 'appSecWarnBody2'],
                            buttons: [{ result: '', title: 'appSecWarnBtn', error: true }],
                        })
                    ).then(() => showView());
                } else {
                    showView();
                }
            });
        }

        function showView() {
            dispatch(uiSetView(UiViewOpen));
            logStartupTime();
        }

        function logStartupTime() {
            const time = Math.round(performance.now());
            logger.info(`Started in ${time}ms ¯\\_(ツ)_/¯`);
        }

        function postInit() {
            // Updater.init();
            // SingleInstanceChecker.init();
            // AppRightsChecker.init();
            // setTimeout(() => PluginManager.runAutoUpdate(), Timeouts.AutoUpdatePluginsAfterStart);
        }
    };
}

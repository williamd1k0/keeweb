import Logger from 'util/logger';
import FeatureTester from 'logic/comp/feature-tester';
import ExportApi from 'logic/comp/export-api';
import IdleTracker from 'logic/comp/idle-tracker';
import KeyHandler from 'logic/comp/key-handler';
import AuthReceiver from 'logic/comp/auth-receiver';
import PopupNotifier from 'logic/comp/popup-notifier';
import KdbxwebInit from 'util/kdbxweb/kdbxweb-init';
import showAlert from 'logic/ui/show-alert';
import settingsLoadRemoteConfig from 'logic/settings/load-remote-config';
import loadSettings from 'logic/settings/load-settings';
import loadFileInfo from 'logic/files/load-file-info';
import uiSetView from 'store/ui/set-view';
import SingleInstanceChecker from 'logic/comp/single-instance-checker';

export default function startup() {
    return (dispatch, getState) => {
        const logger = new Logger('app');

        const state = getState();

        const { env } = state;

        if ((env.isPopup && AuthReceiver.receive()) || env.isFrame) {
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
                dispatch(loadSettings()),
                dispatch(loadFileInfo()),
                // UpdateModel.instance.load(), // TODO
            ]);
        }

        function initModules() {
            window.kw = ExportApi;
            IdleTracker.init();
            KeyHandler.init();
            KdbxwebInit.init();
            PopupNotifier.init();
            // return PluginManager.init();  // TODO
        }

        function loadRemoteConfig() {
            return dispatch(settingsLoadRemoteConfig()).catch(e => {
                dispatch(
                    showAlert({
                        preset: 'fatalError',
                        header: 'appSettingsError',
                        body: 'appSettingsErrorBody',
                    })
                );
                throw e;
            });
        }

        function ensureCanRun() {
            return FeatureTester.test().catch(e => {
                dispatch(
                    showAlert({
                        preset: 'fatalError',
                        header: 'appSettingsError',
                        body: 'appNotSupportedError',
                        error: e,
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
                if (protocolIsInsecure && hostIsInsecure && !skipHttpsWarning) {
                    return dispatch(
                        showAlert({
                            preset: 'fatal-error',
                            header: 'appSecWarn',
                            icon: 'user-secret',
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
            dispatch(uiSetView('open'));
            logStartupTime();
        }

        function logStartupTime() {
            const time = Math.round(performance.now());
            logger.info(`Started in ${time}ms ¯\\_(ツ)_/¯`);
        }

        function postInit() {
            SingleInstanceChecker.init();
            // Updater.init(); // TODO
            // AppRightsChecker.init(); // TODO
            // setTimeout(() => PluginManager.runAutoUpdate(), Timeouts.AutoUpdatePluginsAfterStart);
        }
    };
}

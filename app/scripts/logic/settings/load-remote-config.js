import { Logger } from 'util/logger';
import { updateSettings } from 'logic/settings/update-settings';
import { saveLastFiles } from 'logic/files/save-last-files';
import { setLastFiles } from 'store/files/set-last-files';

export function loadRemoteConfig() {
    return (dispatch, getState) => {
        const logger = new Logger('load-remote-config');

        return Promise.resolve().then(() => {
            const configParam = getConfigParam();
            if (configParam) {
                return loadConfig(configParam)
                    .then(data => {
                        return applyConfig(data);
                    })
                    .catch(e => {
                        if (!getState().settings.cacheConfigSettings) {
                            throw e;
                        }
                    });
            }
        });

        function getConfigParam() {
            const metaConfig = document.head.querySelector('meta[name=kw-config]');
            if (metaConfig && metaConfig.content && metaConfig.content[0] !== '(') {
                return metaConfig.content;
            }
            const match = location.search.match(/[?&]config=([^&]+)/i);
            if (match && match[1]) {
                return match[1];
            }
        }

        function ensureCanLoadConfig(url) {
            if (!getState().env.isSelfHosted) {
                // throw 'Configs are supported only in self-hosted installations';
            }
            const link = document.createElement('a');
            link.href = url;
            const isExternal = link.host && link.host !== location.host;
            if (isExternal) {
                throw 'Loading config from this location is not allowed';
            }
        }

        function loadConfig(configLocation) {
            return new Promise((resolve, reject) => {
                ensureCanLoadConfig(configLocation);
                logger.debug('Loading config from', configLocation);
                const ts = logger.ts();
                const xhr = new XMLHttpRequest();
                xhr.open('GET', configLocation);
                xhr.responseType = 'json';
                xhr.send();
                xhr.addEventListener('load', () => {
                    let response = xhr.response;
                    if (!response) {
                        const errorDesc =
                            xhr.statusText === 'OK' ? 'Malformed JSON' : xhr.statusText;
                        logger.error('Error loading app config', errorDesc);
                        return reject('Error loading app config');
                    }
                    if (typeof response === 'string') {
                        try {
                            response = JSON.parse(response);
                        } catch (e) {
                            logger.error('Error parsing response', e, response);
                            return reject('Error parsing response');
                        }
                    }
                    if (!response.settings) {
                        logger.error('Invalid app config, no settings section', response);
                        return reject('Invalid app config, no settings section');
                    }
                    logger.info('Loaded app config from', configLocation, logger.ts(ts));
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    logger.error('Error loading app config', xhr.statusText, xhr.status);
                    reject('Error loading app config');
                });
            });
        }

        function applyConfig(config) {
            dispatch(updateSettings(config.settings));
            if (config.files) {
                const removeExisting = !!config.showOnlyFilesFromConfig;
                dispatch(setLastFiles(config.files, removeExisting));
                return dispatch(saveLastFiles());
            }
        }
    };
}

import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

const Footer = ({ locale, files, updateAvailable, onOpenClick, onSettingsClick }) => (
    <div className="app__footer">
        <div className="footer">
            {files.map(file => (
                <div
                    className={`footer__db footer__db-item ${
                        file.open ? '' : 'footer__db--dimmed'
                    }`}
                    data-file-id={file.id}
                    key={file.id}
                >
                    <i className={`fa fa-${file.open ? 'unlock' : 'lock'}`} /> {file.name}
                    {!!file.syncing && <i className="fa fa-refresh fa-spin footer__db-sign" />}
                    {!!(!file.syncing && file.syncError) && (
                        <i
                            className={`fa ${
                                file.modified ? 'fa-circle' : 'fa-circle-thin'
                            } footer__db-sign footer__db-sign--error`}
                            title={`${locale.footerSyncError}: ${file.syncError}`}
                        />
                    )}
                    {!!(!file.syncing && !file.syncError && file.modified) && (
                        <i className="fa fa-circle footer__db-sign" />
                    )}
                </div>
            ))}
            <div
                className="footer__db footer__db--dimmed footer__db--expanded footer__db-open"
                onClick={onOpenClick}
            >
                <i className="fa fa-plus" />
                <span className="footer__db-text">
                    {' '}
                    <Res id="footerOpen" />
                </span>
            </div>
            <div className="footer__btn footer__btn-help" title={locale.help} tip-placement="top">
                <i className="fa fa-question" />
            </div>
            <div
                className="footer__btn footer__btn-settings"
                title={locale.settings}
                tip-placement="top"
                onClick={onSettingsClick}
            >
                {updateAvailable ? (
                    <i className="fa fa-bell footer__update-icon" />
                ) : (
                    <i className="fa fa-cog" />
                )}
            </div>
            <div
                className="footer__btn footer__btn-generate"
                title={locale.footerTitleGen}
                tip-placement="top"
            >
                <i className="fa fa-bolt" />
            </div>
            <div
                className="footer__btn footer__btn-lock"
                title={locale.footerTitleLock}
                tip-placement="top-left"
            >
                <i className="fa fa-sign-out" />
            </div>
        </div>
    </div>
);

Footer.propTypes = {
    onOpenClick: PropTypes.func.isRequired,
    onSettingsClick: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
    updateAvailable: PropTypes.bool,
    locale: PropTypes.object.isRequired,
};

export { Footer };

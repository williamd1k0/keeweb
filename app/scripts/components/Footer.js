import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';
import { Tooltip } from 'components/util/Tooltip';
import { KeyHandler } from 'logic/comp/key-handler';
import { Keys } from 'const/keys';

class Footer extends React.Component {
    static propTypes = {
        onFileClick: PropTypes.func.isRequired,
        onOpenClick: PropTypes.func.isRequired,
        onSettingsClick: PropTypes.func.isRequired,
        onHelpClick: PropTypes.func.isRequired,
        onGeneratorClick: PropTypes.func.isRequired,
        files: PropTypes.array.isRequired,
        updateAvailable: PropTypes.bool,
        locale: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
        this.generatorBtn = React.createRef();
    }
    componentDidMount() {
        const off = KeyHandler.onKey(
            Keys.DOM_VK_G,
            this.onGenerateClick,
            this,
            KeyHandler.SHORTCUT_ACTION
        );
        this.subscriptions = [off];
    }
    componentWillUnmount() {
        this.subscriptions.forEach(s => s());
    }
    onFileClick = e => {
        const id = e.target.closest('[data-file-id]').dataset.fileId;
        this.props.onFileClick({ id });
    };
    onGenerateClick = () => {
        const rect = this.generatorBtn.current.getBoundingClientRect();
        const position = { right: rect.right, bottom: rect.top };
        this.props.onGeneratorClick({ position });
    };
    render() {
        const {
            locale,
            files,
            updateAvailable,
            onOpenClick,
            onHelpClick,
            onSettingsClick,
        } = this.props;
        return (
            <div className="app__footer">
                <div className="footer">
                    {files.map(file => (
                        <div
                            className={`footer__db footer__db-item ${
                                file.open ? '' : 'footer__db--dimmed'
                            }`}
                            data-file-id={file.id}
                            key={file.id}
                            onClick={this.onFileClick}
                        >
                            <i className={`fa fa-${file.open ? 'unlock' : 'lock'}`} /> {file.name}
                            {!!file.syncing && (
                                <i className="fa fa-refresh fa-spin footer__db-sign" />
                            )}
                            {!!(!file.syncing && file.syncError) && (
                                <Tooltip
                                    className={`fa ${
                                        file.modified ? 'fa-circle' : 'fa-circle-thin'
                                    } footer__db-sign footer__db-sign--error`}
                                    title={`${locale.footerSyncError}: ${file.syncError}`}
                                    tagName="i"
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
                    <Tooltip
                        className="footer__btn footer__btn-help"
                        title={locale.help}
                        placement="top"
                        onClick={onHelpClick}
                    >
                        <i className="fa fa-question" />
                    </Tooltip>
                    <Tooltip
                        className="footer__btn footer__btn-settings"
                        title={locale.settings}
                        placement="top"
                        onClick={onSettingsClick}
                    >
                        {updateAvailable ? (
                            <i className="fa fa-bell footer__update-icon" />
                        ) : (
                            <i className="fa fa-cog" />
                        )}
                    </Tooltip>
                    <Tooltip
                        className="footer__btn footer__btn-generate"
                        title={locale.footerTitleGen}
                        placement="top"
                        onClick={this.onGenerateClick}
                        elRef={this.generatorBtn}
                    >
                        <i className="fa fa-bolt" />
                    </Tooltip>
                    <Tooltip
                        className="footer__btn footer__btn-lock"
                        title={locale.footerTitleLock}
                        placement="top-left"
                    >
                        <i className="fa fa-sign-out" />
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export { Footer };

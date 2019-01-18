import React from 'react';
import PropTypes from 'prop-types';
import Res from 'containers/util/Res';
import OpenButton from 'components/OpenButton';

class Open extends React.Component {
    propTypes = {
        locale: PropTypes.object.isRequired,
        lastFiles: PropTypes.array.isRequired,
        file: PropTypes.object.isRequired,
        rows: PropTypes.object.isRequired,
        secondRowVisible: PropTypes.bool,
        canOpen: PropTypes.bool,
        canOpenKeyFromDropbox: PropTypes.bool,
        canRemoveLatest: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        onFileInputChange: PropTypes.func.isRequired,
        onFileClick: PropTypes.func.isRequired,
        onFileDeleteClick: PropTypes.func.isRequired,
    };
    onButtonClick = e => {
        const id = e.target.closest('[data-id]').dataset.id;
        switch (id) {
            case 'open':
            case 'import-xml':
                this.fileInput.button = id;
                this.fileInput.click();
                return;
            default:
                this.props.onClick({ button: id });
        }
    };
    onFileClick = e => {
        const id = e.target.closest('[data-id]').dataset.id;
        this.props.onFileClick({ id });
    };
    onFileDeleteClick = e => {
        const id = e.target.closest('[data-id]').dataset.id;
        this.props.onFileDeleteClick({ id });
    };
    passwordInputClick = () => {
        if (!this.props.file) {
            this.fileInput.button = 'open';
            this.fileInput.click();
        }
    };
    fileInputChange = e => {
        const file = e.target.files[0];
        const button = this.fileInput.button;
        this.fileInput.value = null;
        this.props.onFileInputChange({ button, file });
    };
    componentDidUpdate() {
        if (this.props.file && this.passwordInput) {
            this.passwordInput.focus();
        }
    }
    render() {
        const {
            locale,
            lastFiles,
            rows,
            file,
            canOpen,
            canRemoveLatest,
            canOpenKeyFromDropbox,
            secondRowVisible,
        } = this.props;
        let passwordInputPlaceholder = '';
        if (file) {
            passwordInputPlaceholder = `${locale.openPassFor} ${file.name}`;
        } else if (canOpen) {
            passwordInputPlaceholder = locale.openClickToOpen;
        }
        let ix = 0;
        return (
            <div className="open">
                <input
                    type="file"
                    className="open__file-ctrl hide-by-pos"
                    ref={node => (this.fileInput = node)}
                    onChange={this.fileInputChange}
                />
                <div className="open__icons">
                    {rows.first.map(btn => (
                        <OpenButton
                            key={btn.id}
                            button={btn}
                            tabIndex={++ix}
                            onClick={this.onButtonClick}
                        />
                    ))}
                </div>
                {!!secondRowVisible && (
                    <div className="open__icons open__icons--lower">
                        {rows.second.map(btn => (
                            <OpenButton
                                key={btn.id}
                                button={btn}
                                tabIndex={++ix}
                                onClick={this.onButtonClick}
                            />
                        ))}
                    </div>
                )}
                <div className="open__pass-area">
                    <div className="hide">
                        {/* we need these inputs to screw browsers passwords autocompletion */}
                        <input type="text" style="display:none" name="username" />
                        <input type="password" style="display:none" name="password" />
                    </div>
                    <div className="open__pass-warn-wrap">
                        <div className="open__pass-warning muted-color invisible">
                            <i className="fa fa-exclamation-triangle" /> <Res id="openCaps" />
                        </div>
                    </div>
                    <div className="open__pass-field-wrap">
                        <input
                            className="open__pass-input"
                            name="password"
                            type="password"
                            size="30"
                            autoComplete="new-password"
                            autoFocus={!!file}
                            maxLength="1024"
                            placeholder={passwordInputPlaceholder}
                            onClick={file ? undefined : this.passwordInputClick}
                            readOnly={!file}
                            tabIndex={++ix}
                            ref={node => (this.passwordInput = node)}
                        />
                        <div className="open__pass-enter-btn" tabIndex={++ix}>
                            <i className="fa fa-level-down fa-rotate-90" />
                        </div>
                        <div className="open__pass-opening-icon">
                            <i className="fa fa-spinner fa-spin" />
                        </div>
                    </div>
                    <div className="open__settings">
                        <div className="open__settings-key-file hide" tabIndex={++ix}>
                            <i className="fa fa-key open__settings-key-file-icon" />
                            <span className="open__settings-key-file-name">
                                {' '}
                                <Res id="openKeyFile" />
                            </span>
                            {!!canOpenKeyFromDropbox && (
                                <span className="open__settings-key-file-dropbox">
                                    {' '}
                                    <Res id="openKeyFileDropbox" />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="open__last">
                        {lastFiles.map(file => (
                            <div
                                className="open__last-item"
                                key={file.id}
                                data-id={file.id}
                                title={file.path}
                                tabIndex={++ix}
                                onClick={this.onFileClick}
                            >
                                {!!file.icon && (
                                    <i className={`fa fa-${file.icon} open__last-item-icon`} />
                                )}
                                {!!file.iconSvg && (
                                    <div className="open__last-item-icon open__last-item-icon--svg">
                                        {file.iconSvg}
                                    </div>
                                )}
                                <span className="open__last-item-text">{file.name}</span>
                                {!!canRemoveLatest && (
                                    <i
                                        className="fa fa-times open__last-item-icon-del"
                                        onClick={this.onFileDeleteClick}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Open;

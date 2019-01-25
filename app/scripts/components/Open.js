import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';
import { OpenButton } from 'components/OpenButton';
import { KeyHandler } from 'logic/comp/key-handler';
import { Keys } from 'const/keys';
import { Timeouts } from 'const/timeouts';

class Open extends React.Component {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        lastFiles: PropTypes.array.isRequired,
        file: PropTypes.object,
        rows: PropTypes.object.isRequired,
        secondRowVisible: PropTypes.bool,
        canOpen: PropTypes.bool,
        canOpenKeyFromDropbox: PropTypes.bool,
        canRemoveLatest: PropTypes.bool,
        busy: PropTypes.bool.isRequired,
        loading: PropTypes.string,
        error: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        onFileSelect: PropTypes.func.isRequired,
        onFileClick: PropTypes.func.isRequired,
        onFileDeleteClick: PropTypes.func.isRequired,
        onDropboxKeyFileClick: PropTypes.func.isRequired,
        onKeyFileDeselect: PropTypes.func.isRequired,
        onPreviousFileSelect: PropTypes.func.isRequired,
        onNextFileSelect: PropTypes.func.isRequired,
        onOpenRequest: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
    };
    state = {
        password: '',
    };
    componentDidMount() {
        this.subscriptions = [
            KeyHandler.onKey(Keys.DOM_VK_TAB, this.onTabKeyPress, this),
            KeyHandler.onKey(Keys.DOM_VK_ENTER, this.onEnterKeyPress, this),
            KeyHandler.onKey(Keys.DOM_VK_RETURN, this.onEnterKeyPress, this),
            KeyHandler.onKey(Keys.DOM_VK_Z, this.onUndoKeyPress, this, KeyHandler.SHORTCUT_ACTION),
            KeyHandler.onKey(Keys.DOM_VK_UP, this.onUpKeyPress, this),
            KeyHandler.onKey(Keys.DOM_VK_DOWN, this.onDownKeyPress, this),
        ];
    }
    componentWillUnmount() {
        this.subscriptions.forEach(s => s());
    }
    componentDidUpdate() {
        if (this.props.busy) {
            return;
        }
        if (this.props.file && this.passwordInput) {
            this.passwordInput.focus();
        }
        if (this.props.error && this.state.canSetVisualError) {
            this.setState({ visualError: true, canSetVisualError: false });
            setTimeout(() => this.setState({ visualError: false }), Timeouts.InputShake);
            this.passwordInput.select();
        }
    }
    onTabKeyPress() {
        if (this.props.busy) {
            return;
        }
        if (!this.state.showFocus) {
            this.setState({ showFocus: true });
        }
    }
    onEnterKeyPress() {
        if (this.props.busy) {
            return;
        }
        const el = document.querySelector('[tabindex]:focus');
        if (el) {
            if (el === this.passwordInput) {
                this.onOpenRequest();
            } else {
                el.click();
            }
        }
    }
    onUndoKeyPress(e) {
        e.preventDefault();
    }
    onUpKeyPress() {
        if (this.props.busy) {
            return;
        }
        this.props.onPreviousFileSelect();
    }
    onDownKeyPress() {
        if (this.props.busy) {
            return;
        }
        this.props.onNextFileSelect();
    }
    onButtonClick = e => {
        if (this.props.busy) {
            return;
        }
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
        if (this.props.busy) {
            return;
        }
        const id = e.target.closest('[data-id]').dataset.id;
        this.props.onFileClick({ id });
    };
    onFileDeleteClick = e => {
        e.stopPropagation();
        if (this.props.busy) {
            return;
        }
        const id = e.target.closest('[data-id]').dataset.id;
        this.props.onFileDeleteClick({ id });
    };
    onPasswordInputClick = () => {
        if (this.props.busy) {
            return;
        }
        if (!this.props.file) {
            this.fileInput.button = 'open';
            this.fileInput.click();
        }
    };
    onPasswordInputKeyDown = e => {
        if (this.props.busy) {
            return;
        }
        const ch = e.key;
        const lower = ch.toLowerCase();
        const upper = ch.toUpperCase();
        if (ch.length === 1 && lower !== upper && !e.shiftKey) {
            const capsLockOn = ch !== lower;
            if (capsLockOn !== this.state.capsLockOn) {
                this.setState({ capsLockOn });
            }
        }
    };
    onPasswordInputKeyUp = e => {
        if (this.props.busy) {
            return;
        }
        if (e.key === 'CapsLock') {
            this.setState({ capsLockOn: false });
        }
    };
    onFileInputChange = e => {
        if (this.props.busy) {
            return;
        }
        const file = e.target.files[0];
        const button = this.fileInput.button;
        this.fileInput.value = null;
        this.props.onFileSelect({ button, file });
    };
    onKeyFileClick = () => {
        if (this.props.busy) {
            return;
        }
        if (this.props.file && this.props.file.keyFileName) {
            this.props.onKeyFileDeselect();
        } else {
            this.fileInput.button = 'keyfile';
            this.fileInput.click();
        }
    };
    onDropboxKeyFileClick = e => {
        e.stopPropagation();
        if (this.props.busy) {
            return;
        }
        this.props.onDropboxKeyFileClick();
    };
    onOpenRequest = () => {
        if (this.props.busy) {
            return;
        }
        const password = this.passwordInput.value;
        this.setState({ visualError: false, canSetVisualError: true });
        this.props.onOpenRequest({ password });
    };
    onDragOver = e => {
        if (!this.props.canOpen || this.props.busy) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const dt = e.dataTransfer;
        if (
            !dt.types ||
            (dt.types.indexOf ? dt.types.indexOf('Files') === -1 : !dt.types.contains('Files'))
        ) {
            dt.dropEffect = 'none';
            return;
        }
        dt.dropEffect = 'copy';
        this.setState({ dragging: true });
    };
    onDragLeave = e => {
        if (!this.props.canOpen || this.props.busy) {
            return;
        }
        if (e.target === this.dropZone) {
            this.resetDraggingState();
        }
    };
    onDrop = e => {
        if (!this.props.canOpen || this.props.busy) {
            return;
        }
        e.preventDefault();
        this.resetDraggingState();
        const files = [...e.dataTransfer.files];
        this.props.onDrop({ files });
    };
    resetDraggingState = () => {
        if (this.props.busy) {
            return;
        }
        this.setState({ dragging: false });
    };
    render() {
        const {
            locale,
            lastFiles,
            rows,
            file,
            busy,
            loading,
            error,
            canOpen,
            canRemoveLatest,
            canOpenKeyFromDropbox,
            secondRowVisible,
        } = this.props;
        const { dragging, visualError, showFocus, capsLockOn, password } = this.state;
        let passwordInputPlaceholder = '';
        if (file) {
            passwordInputPlaceholder = `${locale.openPassFor} ${file.name}`;
        } else if (canOpen) {
            passwordInputPlaceholder = locale.openClickToOpen;
        }
        const cls =
            'open' +
            (showFocus ? ' open--show-focus' : '') +
            (file ? '  open--file' : '') +
            (dragging ? ' open--drag' : '') +
            (loading === 'file' ? ' open--opening' : '');
        const inputCls =
            'open__pass-input' +
            (error ? ' input--error' : '') +
            (error && visualError ? ' input-shake' : '');
        let ix = 0;
        return (
            <div
                className={cls}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
            >
                <input
                    type="file"
                    className="open__file-ctrl hide-by-pos"
                    ref={node => (this.fileInput = node)}
                    onChange={this.onFileInputChange}
                />
                <div className="open__icons" key="first-row">
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
                    <div className="open__icons open__icons--lower" key="second-row">
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
                <div className="open__pass-area" key="pass-area">
                    <div className="hide" key="hidden-pass">
                        {/* we need these inputs to screw browsers passwords autocompletion */}
                        <input type="text" style={{ display: 'none' }} name="username" />
                        <input type="password" style={{ display: 'none' }} name="password" />
                    </div>
                    <div className="open__pass-warn-wrap" key="pass-warn">
                        <div
                            className={`open__pass-warning muted-color ${
                                capsLockOn ? '' : 'invisible'
                            }`}
                        >
                            <i className="fa fa-exclamation-triangle" /> <Res id="openCaps" />
                        </div>
                    </div>
                    <div className="open__pass-field-wrap" key="pass-field">
                        <input
                            className={inputCls}
                            name="password"
                            type="password"
                            size="30"
                            autoComplete="new-password"
                            autoFocus={!!file}
                            maxLength="1024"
                            placeholder={passwordInputPlaceholder}
                            onClick={file ? undefined : this.onPasswordInputClick}
                            onKeyDown={this.onPasswordInputKeyDown}
                            onKeyUp={this.onPasswordInputKeyUp}
                            readOnly={busy || !file}
                            tabIndex={++ix}
                            value={password}
                            onChange={e => this.setState({ password: e.target.value })}
                            ref={node => (this.passwordInput = node)}
                        />
                        <div
                            className="open__pass-enter-btn"
                            tabIndex={++ix}
                            onClick={this.onOpenRequest}
                        >
                            <i className="fa fa-level-down fa-rotate-90" />
                        </div>
                        <div className="open__pass-opening-icon">
                            <i className="fa fa-spinner fa-spin" />
                        </div>
                    </div>
                    {!!file && (
                        <div className="open__settings" key="settings">
                            <div
                                className="open__settings-key-file"
                                tabIndex={++ix}
                                onClick={this.onKeyFileClick}
                            >
                                <i className="fa fa-key open__settings-key-file-icon" />
                                <span className="open__settings-key-file-name">
                                    {file.keyFileName ? file.keyFileName : <Res id="openKeyFile" />}
                                </span>
                                {!!canOpenKeyFromDropbox && (
                                    <span
                                        className="open__settings-key-file-dropbox"
                                        onClick={this.onDropboxKeyFileClick}
                                    >
                                        {' '}
                                        <Res id="openKeyFileDropbox" />
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="open__last" key="last">
                        {lastFiles.map(file => (
                            <div
                                className="open__last-item"
                                key={file.id}
                                data-id={file.id}
                                title={file.displayedPath}
                                tabIndex={++ix}
                                onClick={this.onFileClick}
                            >
                                {!!file.icon && (
                                    <i className={`fa fa-${file.icon} open__last-item-icon`} />
                                )}
                                {!!file.iconSvg && (
                                    <div className="open__last-item-icon open__last-item-icon--svg">
                                        <file.iconSvg />
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
                <div className="open__dropzone" key="dropzone" ref={node => (this.dropZone = node)}>
                    <i className="fa fa-lock muted-color open__dropzone-icon" />
                    <h1 className="muted-color open__dropzone-header">
                        <Res id="openDropHere" />
                    </h1>
                </div>
            </div>
        );
    }
}

export { Open };

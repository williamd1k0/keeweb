import React from 'react';
import PropTypes from 'prop-types';
import Res from '../containers/util/Res';

class Open extends React.Component {
    propTypes = {
        locale: PropTypes.object.isRequired,
        firstRow: PropTypes.array.isRequired,
        secondRow: PropTypes.array.isRequired,
        secondRowVisible: PropTypes.bool,
        canOpen: PropTypes.bool,
        canOpenKeyFromDropbox: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        onFileChange: PropTypes.func.isRequired,
    };
    onButtonClick = e => {
        const id = e.target.closest('[data-id]').dataset.id;
        switch (id) {
            case 'open':
            case 'import-xml':
                this.setState({ button: id });
                this.fileInput.click();
                return;
            default:
                this.props.onClick({ button: id });
        }
    };
    passInputClick = e => {
        if (e.target.readOnly) {
            this.setState({ button: 'open' });
            this.fileInput.click();
        }
    };
    fileInputChange = e => {
        const file = e.target.files[0];
        const button = this.state.button;
        this.fileInput.value = null;
        this.props.onFileChange({ button, file });
    };
    render() {
        const {
            locale,
            firstRow,
            secondRow,
            canOpen,
            canOpenKeyFromDropbox,
            secondRowVisible,
        } = this.props;
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
                    {firstRow.map(item => (
                        <div
                            key={item.id}
                            data-id={item.id}
                            className={`open__icon open__icon-${item.id}`}
                            tabIndex={++ix}
                            onClick={this.onButtonClick}
                        >
                            <i className={`fa fa-${item.icon} open__icon-i`} />
                            <div className="open__icon-text">
                                {item.text ? item.text : <Res id={item.res} />}
                            </div>
                        </div>
                    ))}
                </div>
                {!!secondRowVisible && (
                    <div className="open__icons open__icons--lower">
                        {secondRow.map(item => (
                            <div
                                key={item.id}
                                data-id={item.id}
                                className={`open__icon open__icon-${item.id}`}
                                tabIndex={++ix}
                                onClick={this.onButtonClick}
                            >
                                <i className={`fa fa-${item.icon} open__icon-i`} />
                                <div className="open__icon-text">
                                    {item.text ? item.text : <Res id={item.res} />}
                                </div>
                            </div>
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
                            maxLength="1024"
                            placeholder={canOpen ? locale.openClickToOpen : ''}
                            onClick={this.passInputClick}
                            readOnly
                            tabIndex="13"
                        />
                        <div className="open__pass-enter-btn" tabIndex="14">
                            <i className="fa fa-level-down fa-rotate-90" />
                        </div>
                        <div className="open__pass-opening-icon">
                            <i className="fa fa-spinner fa-spin" />
                        </div>
                    </div>
                    <div className="open__settings">
                        <div className="open__settings-key-file hide" tabIndex="15">
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
                        {/*{{#each lastOpenFiles as |file|}}*/}
                        {/*<div className="open__last-item" data-id="{{file.id}}" title="{{file.path}}" tabindex="{{add @index 16}}">*/}
                        {/*{{#if file.icon}}<i className="fa fa-{{file.icon}} open__last-item-icon"></i>{{/if}}*/}
                        {/*{{#if file.iconSvg}}<div className="open__last-item-icon open__last-item-icon--svg">{{{file.iconSvg}}}</div>{{/if}}*/}
                        {/*<span className="open__last-item-text">{{ file.name }}</span>*/}
                        {/*{{#if ../canRemoveLatest}}<i className="fa fa-times open__last-item-icon-del"></i>{{/if}}*/}
                        {/*</div>*/}
                        {/*{{/each}}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Open;

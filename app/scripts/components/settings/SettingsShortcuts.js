import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class SettingsShortcuts extends React.Component {
    static propTypes = {
        cmd: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        global: PropTypes.string.isRequired,
        globalIsLong: PropTypes.bool,
        autoTypeSupported: PropTypes.bool,
        globalShortcutsSupported: PropTypes.bool,
    };
    render() {
        const {
            cmd,
            alt,
            global,
            globalIsLong,
            autoTypeSupported,
            globalShortcutsSupported,
        } = this.props;
        return (
            <div>
                <h1>
                    <i className="fa fa-keyboard-o" /> <Res id="setShTitle" />
                </h1>
                <div>
                    <span className="shortcut">{cmd}A</span> <Res id="or" />{' '}
                    <span className="shortcut">{alt}A</span> <Res id="setShShowAll" />
                </div>
                <div>
                    <span className="shortcut">{alt}C</span> <Res id="setShColors" />
                </div>
                <div>
                    <span className="shortcut">{alt}D</span> <Res id="setShTrash" />
                </div>
                <div>
                    <span className="shortcut">{cmd}F</span> <Res id="setShFind" />
                </div>
                <div>
                    <span className="shortcut">esc</span> <Res id="setShClearSearch" />
                </div>
                <div>
                    <span className="shortcut">{cmd}C</span> <Res id="setShCopyPass" />
                </div>
                <div>
                    <span className="shortcut">{cmd}B</span> <Res id="setShCopyUser" />
                </div>
                <div>
                    <span className="shortcut">{cmd}U</span> <Res id="setShCopyUrl" />
                </div>
                {!!autoTypeSupported && (
                    <div>
                        <span className="shortcut">{cmd}T</span> <Res id="setShAutoType" />
                    </div>
                )}
                <div>
                    <span className="shortcut">&uarr;</span> <Res id="setShPrev" />
                </div>
                <div>
                    <span className="shortcut">&darr;</span> <Res id="setShNext" />
                </div>
                <div>
                    <span className="shortcut">{alt}N</span> <Res id="setShCreateEntry" />
                </div>
                <div>
                    <span className="shortcut">{cmd}O</span> <Res id="setShOpen" />
                </div>
                <div>
                    <span className="shortcut">{cmd}S</span> <Res id="setShSave" />
                </div>
                <div>
                    <span className="shortcut">{cmd}G</span> <Res id="setShGen" />
                </div>
                <div>
                    <span className="shortcut">{cmd},</span> <Res id="setShSet" />
                </div>
                <div>
                    <span className="shortcut">{cmd}L</span> <Res id="setShLock" />
                </div>
                {globalShortcutsSupported && (
                    <>
                        <div>
                            <span className={`shortcut ${globalIsLong ? 'shortcut-large' : ''}`}>
                                {global}C
                            </span>{' '}
                            <Res id="setShCopyPassGlobal" />
                        </div>
                        <div>
                            <span className={`shortcut ${globalIsLong ? 'shortcut-large' : ''}`}>
                                {global}B
                            </span>{' '}
                            <Res id="setShCopyUserGlobal" />
                        </div>
                        <div>
                            <span className={`shortcut ${globalIsLong ? 'shortcut-large' : ''}`}>
                                {global}U
                            </span>{' '}
                            <Res id="setShCopyUrlGlobal" />
                        </div>
                        <div>
                            <span className={`shortcut ${globalIsLong ? 'shortcut-large' : ''}`}>
                                {global}T
                            </span>{' '}
                            <Res id="setShAutoTypeGlobal" />
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export { SettingsShortcuts };

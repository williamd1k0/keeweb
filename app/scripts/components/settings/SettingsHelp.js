import React from 'react';
import PropTypes from 'prop-types';
import { Links } from 'const/links';
import { Res } from 'containers/util/Res';

class SettingsHelp extends React.Component {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        appInfo: PropTypes.string.isRequired,
        createIssueLink: PropTypes.string.isRequired,
    };
    render() {
        const { createIssueLink, appInfo } = this.props;
        return (
            <div>
                <h1>
                    <i className="fa fa-question" /> <Res id="help" />
                </h1>

                <h2>
                    <Res id="setHelpFormat" />
                </h2>
                <p>
                    <Res id="setHelpFormatBody">
                        <a href="https://keepass.info/" target="_blank" rel="noopener noreferrer">
                            KeePass
                        </a>
                    </Res>
                </p>
                <h2>
                    <Res id="setHelpProblems" />
                </h2>
                <p>
                    <Res id="setHelpProblems1">
                        <a href={createIssueLink} target="_blank" rel="noopener noreferrer">
                            <Res id="setHelpOpenIssue" />
                        </a>
                    </Res>{' '}
                    <Res id="setHelpProblems2">
                        <a href="https://antelle.net/" target="_blank" rel="noopener noreferrer">
                            <Res id="setHelpContactLink" />
                        </a>
                    </Res>
                    .
                </p>
                <p>
                    <Res id="setHelpAppInfo" />:
                </p>
                <pre className="settings__pre input-base">{appInfo}</pre>
                <h2>
                    <Res id="setHelpOtherPlatforms" />
                </h2>
                <ul>
                    <li>
                        <i className="fa fa-windows" />
                        &nbsp;
                        <i className="fa fa-apple" />
                        &nbsp;
                        <i className="fa fa-linux" />
                        &nbsp;
                        <a href={Links.Desktop} target="_blank" rel="noopener noreferrer">
                            <Res id="setHelpDesktopApps" />
                        </a>
                    </li>
                    <li>
                        <i className="fa fa-chrome" />
                        &nbsp;
                        <i className="fa fa-firefox" />
                        &nbsp;
                        <i className="fa fa-opera" />
                        &nbsp;
                        <i className="fa fa-compass" />
                        &nbsp;
                        <i className="fa fa-edge" />
                        &nbsp;
                        <a href={Links.WebApp} target="_blank" rel="noopener noreferrer">
                            <Res id="setHelpWebApp" />
                        </a>
                    </li>
                </ul>
                <h2>
                    <Res id="setHelpUpdates" /> <i className="fa fa-twitter" />
                </h2>
                <p>
                    <Res id="setHelpTwitter" />:{' '}
                    <a href="https://twitter.com/kee_web" target="_blank" rel="noopener noreferrer">
                        kee_web
                    </a>
                </p>
            </div>
        );
    }
}

export { SettingsHelp };

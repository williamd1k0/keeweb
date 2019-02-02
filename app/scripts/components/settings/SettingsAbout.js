import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';
import { Links } from 'const/links';

class SettingsAbout extends React.Component {
    static propTypes = {
        version: PropTypes.string.isRequired,
    };
    render() {
        const { version } = this.props;
        return (
            <div>
                <h1>
                    <i className="fa fa-info" /> <Res id="setAboutTitle" /> KeeWeb v{version}
                </h1>
                <p>
                    <Res id="setAboutFirst">
                        <a href="https://antelle.net" target="_blank" rel="noopener noreferrer">
                            Antelle
                        </a>
                    </Res>{' '}
                    <Res id="setAboutSecond">
                        <a href={Links.License} target="_blank" rel="noopener noreferrer">
                            MIT
                        </a>
                    </Res>{' '}
                    <Res id="setAboutSource">
                        <a href={Links.Repo} target="_blank" rel="noopener noreferrer">
                            GitHub <i className="fa fa-github-alt" />
                        </a>
                    </Res>
                </p>
                <a
                    className="settings__donate-btn"
                    href={Links.Donation}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Donate
                </a>
                <p>
                    <Res id="setAboutBuilt" />:
                </p>
                <h3>Libraries</h3>
                <ul>
                    <li>
                        <a
                            href="https://electron.atom.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            electron
                        </a>
                        <span className="muted-color">, cross-platform desktop apps framework</span>
                    </li>
                    <li>
                        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                            react
                        </a>
                        <span className="muted-color">
                            , a JavaScript library for building user interfaces
                        </span>
                    </li>
                    <li>
                        <a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
                            redux
                        </a>
                        <span className="muted-color">
                            , a predictable state container for JavaScript apps
                        </span>
                    </li>
                </ul>

                <h3>Core components</h3>
                <ul>
                    <li>
                        <a
                            href="https://github.com/keeweb/kdbxweb"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            kdbxweb
                        </a>
                        <span className="muted-color">, web kdbx library</span>
                    </li>
                    <li>
                        <a
                            href="https://nodeca.github.io/pako/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            pako
                        </a>
                        <span className="muted-color">, zlib port to JavaScript, very fast</span>
                    </li>
                    <li>
                        <a
                            href="https://github.com/inexorabletash/text-encoding"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            text-encoding
                        </a>
                        <span className="muted-color">
                            , polyfill for the Encoding Living Standard&apos;s API
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://github.com/jindw/xmldom"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            xmldom
                        </a>
                        <span className="muted-color">
                            , a pure JS W3C Standard based DOMParser and XMLSerializer
                        </span>
                    </li>
                </ul>

                <h3>UI components</h3>
                <ul>
                    <li>
                        <a
                            href="https://github.com/Diokuz/baron"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            baron
                        </a>
                        <span className="muted-color">, native scroll with custom scrollbar</span>
                    </li>
                    <li>
                        <a
                            href="https://dbushell.github.io/Pikaday/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            pikaday
                        </a>
                        <span className="muted-color">, a refreshing JavaScript datepicker</span>
                    </li>
                    <li>
                        <a
                            href="https://github.com/TomFrost/node-phonetic"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            node-phonetic
                        </a>
                        <span className="muted-color">, generates unique, pronounceable names</span>
                    </li>
                </ul>

                <h3>Desktop modules</h3>
                <ul>
                    <li>
                        <a
                            href="https://github.com/antelle/node-stream-zip"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            node-stream-zip
                        </a>
                        <span className="muted-color">
                            , node.js library for fast reading of large ZIPs
                        </span>
                    </li>
                </ul>

                <h3>Utils</h3>
                <ul>
                    <li>
                        <a
                            href="https://github.com/LazarSoft/jsqrcode"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            jsqrcode
                        </a>
                        <span className="muted-color">
                            , QR code scanner,{' '}
                            <a
                                href={Links.LicenseApache}
                                className="muted-color"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Apache-2.0 license
                            </a>
                        </span>
                    </li>
                </ul>

                <h3>Styles</h3>
                <ul>
                    <li>
                        <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">
                            sass
                        </a>
                        <span className="muted-color">, syntactically awesome stylesheets</span>
                    </li>
                    <li>
                        <a href="https://bourbon.io/" target="_blank" rel="noopener noreferrer">
                            bourbon
                        </a>
                        <span className="muted-color">
                            , a simple and lightweight mixin library for Sass
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://bitters.bourbon.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            bitters
                        </a>
                        <span className="muted-color">
                            , styles, variables and structure for Bourbon projects
                        </span>
                    </li>
                    <li>
                        <a
                            href="https://necolas.github.io/normalize.css/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            normalize.css
                        </a>
                        <span className="muted-color">
                            , a modern, HTML5-ready alternative to CSS resets
                        </span>
                    </li>
                </ul>

                <h3>Graphics</h3>
                <ul>
                    <li>
                        <a
                            href="https://fortawesome.github.io/Font-Awesome/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            fontawesome
                        </a>
                        <span className="muted-color">, the iconic font and CSS toolkit</span>
                    </li>
                </ul>

                <h2>
                    <Res id="setAboutLic" />
                </h2>
                <p>
                    <Res id="setAboutLicComment" />:
                </p>
                <p />
                <p>
                    Permission is hereby granted, free of charge, to any person obtaining a copy of
                    this software and associated documentation files (the &ldquo;Software&rdquo;),
                    to deal in the Software without restriction, including without limitation the
                    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is furnished
                    to do so, subject to the following conditions:
                </p>
                <p>
                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.
                </p>
                <p>
                    THE SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY OF ANY KIND,
                    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
                    EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                    OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                    THE SOFTWARE.
                </p>
            </div>
        );
    }
}

export { SettingsAbout };

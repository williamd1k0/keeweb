import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class SettingsGeneral extends React.Component {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        locales: PropTypes.array.isRequired,
        activeLocale: PropTypes.string.isRequired,
        setLocale: PropTypes.func.isRequired,
        themes: PropTypes.array.isRequired,
        activeTheme: PropTypes.string.isRequired,
        setTheme: PropTypes.func.isRequired,
        fontSize: PropTypes.number.isRequired,
        setFontSize: PropTypes.func.isRequired,
    };
    setLocale = e => {
        const locale = e.target.value;
        this.props.setLocale({ locale });
    };
    setTheme = e => {
        const theme = e.target.value;
        this.props.setTheme({ theme });
    };
    setFontSize = e => {
        const fontSize = +e.target.value;
        this.props.setFontSize({ fontSize });
    };
    render() {
        const { locale, locales, activeLocale, themes, activeTheme, fontSize } = this.props;
        return (
            <div>
                <h1>
                    <i className="fa fa-cog" /> <Res id="setGenTitle" />
                </h1>
                {/*TODO: updater*/}
                <h2>
                    <Res id="setGenAppearance" />
                </h2>
                <div>
                    <label htmlFor="settings__general-locale">
                        <Res id="setGenLocale" />:
                    </label>
                    <select
                        className="settings__general-locale settings__select input-base"
                        id="settings__general-locale"
                        value={activeLocale}
                        onChange={this.setLocale}
                    >
                        {locales.map(locale => (
                            <option key={locale.id} value={locale.id}>
                                {locale.text}
                            </option>
                        ))}
                        <option value="...">({locale.setGenLocOther})</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="settings__general-theme">
                        <Res id="setGenTheme" />:
                    </label>
                    <select
                        className="settings__general-theme settings__select input-base"
                        id="settings__general-theme"
                        value={activeTheme}
                        onChange={this.setTheme}
                    >
                        {themes.map(theme => (
                            <option key={theme.id} value={theme.id}>
                                {theme.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="settings__general-font-size">
                        <Res id="setGenFontSize" />:
                    </label>
                    <select
                        className="settings__general-font-size settings__select input-base"
                        id="settings__general-font-size"
                        value={fontSize}
                        onChange={this.setFontSize}
                    >
                        <option value={0}>{locale.setGenFontSizeNormal}</option>
                        <option value={1}>{locale.setGenFontSizeLarge}</option>
                        <option value={2}>{locale.setGenFontSizeLargest}</option>
                    </select>
                </div>
            </div>
        );
    }
}

export { SettingsGeneral };

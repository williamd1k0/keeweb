import React from 'react';
import PropTypes from 'prop-types';
import Res from '../containers/util/Res';

class Open extends React.Component {
    propTypes = {
        firstRow: PropTypes.array.isRequired,
        secondRow: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
        onFileChange: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = { secondRowVisible: false };
    }
    onMoreClick = () => {
        this.setState({ secondRowVisible: !this.state.secondRowVisible });
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
    fileInputChange = e => {
        const files = e.target.files;
        const button = this.state.button;
        this.fileInput.value = null;
        this.props.onFileChange({ button, files });
    };
    render() {
        const { firstRow, secondRow } = this.props;
        const { secondRowVisible } = this.state;
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
                            <div className="open__icon-text">{item.text ? item.text : <Res id={item.res} />}</div>
                        </div>
                    ))}
                    {secondRow.length > 0 && (
                        <div
                            key="more"
                            className={`open__icon open__icon-more`}
                            tabIndex={++ix}
                            onClick={this.onMoreClick}
                        >
                            <i className={`fa fa-ellipsis-h open__icon-i`} />
                            <div className="open__icon-text">
                                <Res id="openMore" />
                            </div>
                        </div>
                    )}
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
                                <div className="open__icon-text">{item.text ? item.text : <Res id={item.res} />}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Open;

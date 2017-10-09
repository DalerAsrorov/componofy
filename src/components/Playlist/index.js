import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Playlist extends PureComponent {
    state = {
        isOpen: true
    };

    _handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {
            playlist: { name, images, external_urls: { spotify: playlistURL } },
            classes
        } = this.props;

        return <div />;

        // return (
        //     <div>
        //         <a target="__blank" href={playlistURL}>
        //             {name}
        //         </a>
        //     </div>
        // );
    }
}

Playlist.propTypes = {
    playlist: PropTypes.object
};

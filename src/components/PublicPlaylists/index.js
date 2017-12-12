import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Search as SearchIcon } from 'material-ui-icons';
import * as R from 'ramda';
import {
    MY_PLAYLISTS_PROPTYPE,
    LIGHT_BLUE_COLOR,
    SCROLL_DURATION,
    searchKeyMap,
    footerStyle,
    searchStyle
} from '../../utils/constants';
import { filterSearchPlaylist } from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const styles = theme => ({
    hotKeys: {
        outline: 'none'
    },

    searchAdortment: {
        position: 'relative',
        top: `${theme.spacing.unit / 2}px`,
        marginRight: `${theme.spacing.unit}px`,
        color: LIGHT_BLUE_COLOR
    }
});

class PublicPlaylists extends PureComponent {
    static propTypes = {
        setPublicPlaylistsVisited: PropTypes.func.isRequired,
        removePlaylistFromFinal: PropTypes.func.isRequired,
        setSearchResultsMessage: PropTypes.func.isRequired,
        setPublicPlaylistOpen: PropTypes.func.isRequired,
        searchPublicPlaylists: PropTypes.func.isRequired,
        setPublicSearchTerm: PropTypes.func.isRequired,
        addPlaylistToFinal: PropTypes.func.isRequired,
        publicPlaylists: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    };

    _handleFocusOnSearch = event => {
        event.preventDefault();
        this.searchInputRef.focus();
    };

    _handleInputChange = event => {
        let { value: inputValue } = event.target;

        this.props.setPublicSearchTerm(inputValue);
    };

    _handleSearchSubmit = event => {
        const { publicPlaylists: { searchTerm } } = this.props;
        event.preventDefault();

        if (R.isEmpty(searchTerm)) {
            console.log('search featured/suggested playlists');
        } else {
            this.props.searchPublicPlaylists();
        }
    };

    _handleClickPlaylist = (id, isOpen) => {
        this.props.setPublicPlaylistOpen(id, !isOpen);
    };

    _handleAddPlaylist = (playlist, containsPlaylist) => {
        if (!containsPlaylist) {
            return this.props.addPlaylistToFinal(playlist);
        }

        return this.props.removePlaylistFromFinal(playlist);
    };

    componentDidMount() {
        const {
            publicPlaylists: { isVisited },
            setPublicPlaylistsVisited
        } = this.props;

        if (!isVisited) {
            setPublicPlaylistsVisited();
        }
    }

    render() {
        const {
            publicPlaylists: { searchTerm, playlists, searchResultsMessage },
            classes
        } = this.props;
        let listOfPlaylistsComponent, pageComponent;

        if (!R.isEmpty(playlists)) {
            listOfPlaylistsComponent = (
                <List
                    onClickMain={this._handleAddPlaylist}
                    onClickItem={this._handleClickPlaylist}
                    items={playlists}
                    subheader={searchResultsMessage}
                    isPlaylist={true}
                />
            );
        }

        pageComponent = (
            <form
                onSubmit={this._handleSearchSubmit}
                name="playlistsSearchForm"
                className={classes.playlistsSearchForm}
            >
                <Search
                    onChange={this._handleInputChange}
                    inputId="publicPlaylistsSearch"
                    style={searchStyle}
                    value={searchTerm}
                    startAdornment={
                        <SearchIcon
                            onClick={this._handleFocusOnSearch}
                            className={classes.searchAdortment}
                        />
                    }
                    placeholder="Search public playlists by artists, type, mood..."
                    inputRef={input => {
                        this.searchInputRef = input;
                    }}
                    autoComplete="off"
                    autoFocus
                />
                {listOfPlaylistsComponent}
            </form>
        );

        return pageComponent;
    }
}

export default withStyles(styles)(PublicPlaylists);

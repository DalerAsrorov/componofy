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

const styles = theme => ({});

class PublicPlaylists extends PureComponent {
    static propTypes = {
        publicPlaylists: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    };

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { publicPlaylists } = this.props;

        return (
            <div>
                <h1> Stuff </h1>
            </div>
        );
    }
}

export default withStyles(styles)(PublicPlaylists);

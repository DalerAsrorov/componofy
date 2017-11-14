import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import Typography from 'material-ui/Typography';
import ArrowDropDownCircle from 'material-ui-icons/ArrowDropDownCircle';
import Badge from 'material-ui/Badge';
import Grid from 'material-ui/Grid';
import Settings from '../../containers/Settings';

import './FooterPanel.css';

const styles = theme => ({
    root: {
        background: lightBlue[600],
        position: 'sticky',
        bottom: '0',
        paddingTop: `${theme.spacing.unit}px`,
        paddingBottom: `${theme.spacing.unit}px`
    },

    maintext: {},

    loadmore: {},

    settings: {
        float: 'right'
    },

    settingsWrapper: {}
});

export const FooterPanel = props => {
    return (
        <Toolbar className={props.classes.root}>
            <Grid container>
                <Grid item sm={4} xs={7}>
                    <Button
                        onClick={props.onClick}
                        disabled={!props.shouldShowCircle}
                        raised
                        color="accent"
                        className={props.classes.loadmore}
                    >
                        <Typography type="subheading">
                            {props.mainText}
                        </Typography>
                    </Button>
                    <IconButton
                        color="primary"
                        disabled
                        aria-label="Playlists remaining"
                    >
                        {props.circleText}
                    </IconButton>
                </Grid>
                <Grid
                    className={props.classes.settingsWrapper}
                    item
                    sm={8}
                    xs={5}
                >
                    <Settings
                        onClickOptions={props.onClickOptions}
                        onSelectItem={props.onSelectItem}
                        anchorEl={props.anchorEl}
                        isOpen={props.isOpen}
                        canScrollUp={props.canScrollUp}
                        className={props.classes.settings}
                    />
                </Grid>
            </Grid>
        </Toolbar>
    );
};

FooterPanel.propTypes = {
    onClickOptions: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    mainText: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    canScrollUp: PropTypes.bool,
    anchorEl: PropTypes.object,
    circleText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shouldShowCircle: PropTypes.bool
};

export default withStyles(styles)(FooterPanel);

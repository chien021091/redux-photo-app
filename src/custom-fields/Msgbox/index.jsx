import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

Msgbox.propTypes = {
  children: PropTypes.object,
  isOpen : PropTypes.bool,
  handleCloseMsgbox: PropTypes.func,
  title: PropTypes.string,
  customFullWidth: PropTypes.bool,
  customMaxWidth: PropTypes.string,
  data: PropTypes.object
}

Msgbox.defaultProps = {
  children: {},
  isOpen : false,
  handleCloseMsgbox: null,
  customFullWidth: true,
  customMaxWidth: "md",
  data: {}
}

function Msgbox(props) {
  const {isOpen, handleCloseMsgbox, customFullWidth , customMaxWidth, data } = props;

  const handleClose = () => {
    handleCloseMsgbox();
  };

  return (
    <div>
      <Dialog fullWidth={customFullWidth} maxWidth={customMaxWidth} onClose={handleClose} aria-labelledby="max-width-dialog-title" open={isOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {data.title}
        </DialogTitle>
        <DialogContent dividers>
          {data.content}
        </DialogContent>
        <DialogActions>
          {
            
            data.buttons && Object.values(data.buttons).map(btn =>
            (<Button autoFocus onClick={handleClose} color="primary">
              {btn.label}
            </Button>))
          }
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Msgbox;

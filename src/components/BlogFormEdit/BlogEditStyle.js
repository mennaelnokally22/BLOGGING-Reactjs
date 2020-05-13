import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addBtn: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  },
  submitBtn: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '16px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: '#212121',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  w: {
    width: '50%',
  },
}));

export default useStyles;

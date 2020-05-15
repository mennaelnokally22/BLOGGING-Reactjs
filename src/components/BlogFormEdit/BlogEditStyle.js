import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: 'darkgray',
      },
    },
    MuiInputBase: {
      input: {
        color: 'white',
      },
      multiline: {
        color: 'white',
      },
    },
  },
});

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
  dialog: {
    backgroundColor: '#383535',
    color: 'white',
  },
}));

export { useStyles, theme };

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: 'darkgray',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'block',
    transition: 'transform 0.2s ease-in-out',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    width: '75%',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  card: {
    backgroundColor: '#383535a6',
    borderLeft: `4px solid ${theme.palette.info.main}`,
    padding: theme.spacing(4),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  mt: {
    marginTop: theme.spacing(2),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      marginRight: '3px',
    },
  },
  createdAt: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
  },
  mb: {
    marginBottom: theme.spacing(3),
  },
  tags: {
    backgroundColor: 'lightskyblue',
    border: '2px solid lightskyblue',
    borderRadius: '12px',
  },
  timeContainer: {
    display: 'flex',
  },
  mr: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'black',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  txtColor: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  submitBtn: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '16px',
    backgroundColor: theme.palette.info.main,
  },
}));

export { useStyles, theme };

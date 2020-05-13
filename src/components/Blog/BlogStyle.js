import { makeStyles } from '@material-ui/core/styles';

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
    backgroundColor: theme.palette.info.main,
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
    border: `2px solid ${theme.palette.info.main}`,
    borderRadius: '22px',
    color: theme.palette.info.main,
    padding: '2px',
  },
  timeContainer: {
    display: 'flex',
  },
  mr: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  txtColor: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  iconColor: {
    color: theme.palette.info.main,
  },
}));

export default useStyles;

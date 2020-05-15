import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'block',
    transition: 'transform 0.2s ease-in-out',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    width: '50%',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
    borderRadius: '20px',
  },
  card: {
    //backgroundColor: '#383535a6',
    backgroundColor: 'transparent',
    borderLeft: `4px solid ${theme.palette.info.main}`,
    borderRight: `4px solid ${theme.palette.info.main}`,
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
    paddingLeft: '15px',
    paddingRight: '15px',
    textAlign: 'center',
  },
  timeContainer: {
    display: 'flex',
  },
  mr: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '38px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  authorName: {
    color: 'white',
    fontSize: '38px',
    fontWeight: '500',
  },
  txtColor: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  iconColor: {
    color: theme.palette.info.main,
  },
  img: {
    width: '100%',
    border: '1px solid transparent',
    borderRadius: '20px',
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;

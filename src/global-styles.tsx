import { makeStyles } from "@material-ui/core";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  appHeader: {
    flexGrow: 1,
  },
  black: {
    color: "black",
  },
  calendarIcon: {
    height: "2em",
    width: "2em",
    "&:hover, &:focus": {
      color: () => theme.palette.primary.main,
    },
  },
  center: {
    textAlign: "center",
  },
  paddingRight: {
    paddingRight: "1em",
  },
  content: {
    padding: theme.spacing(1),
  },
  editLibrary: {
    maxWidth: "49%",
    margin: "0px 0px 0px 11px",
  },
  horizontalListItem: {
    flexDirection: "row",
    display: "flex",
  },
  longWidth: {
    minWidth: "23em",
  },
  muiDrawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  alignToDrawer: {
    paddingLeft: drawerWidth,
  },
  padBottom: {
    paddingBottom: theme.spacing(2),
  },
  paddingOne: {
    padding: theme.spacing(1),
  },
  paddingOneChildren: {
    "& *": {
      margin: theme.spacing(1),
    },
  },
  paddingTwo: {
    padding: theme.spacing(2),
  },
  paddingTopTiny: {
    paddingTop: theme.spacing(0.5),
  },
  paddingTop: {
    paddingTop: theme.spacing(1),
  },
  paddingTopTwo: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  // Sales
  smallerHeight: {
    height: "6em",
  },
  nextToTextField: {
    position: "relative",
    right: "-12em",
    top: "-4em",
  },
}));

export default useStyles;

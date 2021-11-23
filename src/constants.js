import { makeStyles } from "@material-ui/core/styles";

export const currencies = [
  {
    value: "USD",
  },
  {
    value: "ILS",
  },
];

export const investmentTypes = [
  {
    value: "Stock-Market",
  },
  {
    value: "Real-Estat",
  },
];

export const liquidityLables = [
  {
    value: "days",
    label: "Days",
  },
  {
    value: "months",
    label: "Months",
  },
  {
    value: "years",
    label: "Years",
  },
];

const drawerWidth = 200;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  table: {
    minWidth: 650,
  },
  headerCells: {
    fontWeight: "bold",
  },
  setRoot: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  planSummeryCard: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  planSummeryCardItems: {
    margin: "12px",
    justifyItems: "center",
  },
  planSummeryCardTitle: {
    display: "flex",
    justifyContent: "center",
  },
  planSummeryContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  planSummerySubContainers: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
}));

export const investmentIn = {
  name: "",
  company: "",
  currency: "",
  revPerYear: 0,
  amount: 0,
  liquidity: "",
  type: "",
  isCompanyCapital: false,
  isRegulated: false,
  endDate: "",
};

export const inputValidation = {
  name: { error: false, text: "name is requierd" },
  company: { error: false, text: "company is requierd" },
  currency: { error: false, text: "currency is requierd" },
  revPerYear: { error: false, text: "revenue is requierd" },
  amount: { error: false, text: "amount is requierd" },
  liquidity: { error: false, text: "liquitidy is requierd" },
  type: { error: false, text: "investment type is requierd" },
};

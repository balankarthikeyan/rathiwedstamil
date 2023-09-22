import { makeStyles } from "@material-ui/core/styles"
export const useCalenderStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "fit-content",
    paddingLeft: "6px",
  },
  time: {
    marginTop: "16px",
  },
  date: {
    width: 160,
  },
  dateNative: {
    marginTop: "16px",
    maxWidth: 200,
  },
}))

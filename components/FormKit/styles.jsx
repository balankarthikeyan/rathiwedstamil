import { makeStyles, useTheme } from "@material-ui/core/styles"
export const useFacetUIStyles = makeStyles({
  cardSadhow: {
    boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset",
  },
})

export const useFacetUIContentStyles = makeStyles({
  dividerBottom: {
    borderBottom: "0.1em solid rgba(0, 0, 0, 0.1)",
  },

  textFiled1: {
    width: "280px",
    marginRight: "32px",
  },
  textFiled2: {
    width: "250px",
    marginRight: "20px",
  },
  actionDiv: {},
  saveBtn: {
    float: "right",
    margin: "30px 50px",
    fontWeight: "bold",
  },
  cancelBtn: {
    float: "left",
    margin: "30px",
    background: "white",
    fontWeight: "bold",
    color: "black",
  },
  formDropdown: {
    width: "300px",
    height: "37.5px",
  },
  formCheckbox: {
    display: "inline-flex !important",
    // width:'50%'
  },
  formLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: " 14px",
  },
  formLabelD: {
    color: "black",
    fontWeight: "bold",
    fontSize: " 14px",
    paddingTop: " 12px",
  },
})

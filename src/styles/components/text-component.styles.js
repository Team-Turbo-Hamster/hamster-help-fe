import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(2),
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textShadow: `2px 2px ${theme.palette.primary.dark}`,
    color: theme.palette.primary.main,
  },
}));

export default useStyles;

import Image from "../animation/random.png";
const randomStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(7),
    height: "94vh",
    background: `url(${Image})  no-repeat fixed center `,
    backgroundSize: "150vw 150vh"
  },
  searchControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    marginTop: "20vh",
    marginBottom: "2vh",
    height: "8rem",
    width: "8rem"
  }
});

export default randomStyles;

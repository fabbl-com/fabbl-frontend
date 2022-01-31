import Image from "../animation/random.svg";
const randomStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(7),
    height: "94vh",
    background: `url(${Image})  no-repeat fixed center `,
    backgroundSize: "200vw 200vh"
  },
  searchControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    marginTop: "20vh",
    marginBottom: "2vh",
    height: "9rem",
    width: "9rem"
  }
});

export default randomStyles;

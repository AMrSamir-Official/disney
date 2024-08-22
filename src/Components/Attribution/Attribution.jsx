import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "./Attribution.scss";
const Attribution = () => (
  <Typography className="Attribution" sx={{ display: "flex" }} component="div">
    <Typography variant="body2">
      <Link href="https://github.com/AMrSamir-Official/Disney" underline="none">
        Disney
      </Link>{" "}
      by{" "}
      <Link href="https://github.com/AMrSamir-Official" underline="none">
        Amr Samir
      </Link>{" "}
      is licensed under{" "}
      <Link
        href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1"
        target="_blank"
        rel="license noopener noreferrer"
        underline="none"
        sx={{ display: "inline-flex", alignItems: "center" }}
      >
        CC BY-SA 4.0
        <img
          src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
          alt="CC Icon"
        />
        <img
          src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
          alt="BY Icon"
        />
        <img
          src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
          alt="SA Icon"
        />
      </Link>
    </Typography>
  </Typography>
);

export default Attribution;

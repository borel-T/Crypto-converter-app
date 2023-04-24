import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import BookSvg from "../../assets/images/book-solid.svg";
import GitSvg from "../../assets/images/github.svg";
import TwitterSvg from "../../assets/images/twitter.svg";
import MediumSvg from "../../assets/images/medium.svg";
import DiscordSvg from "../../assets/images/discord.svg";

const footerLinks = [
  { url: "https://docs.orbiter.finance/", icon: BookSvg },
  { url: "https://github.com/Orbiter-Finance", icon: GitSvg },
  { url: "https://twitter.com/Orbiter_Finance", icon: TwitterSvg },
  { url: "https://orbiter-finance.medium.com/", icon: MediumSvg },
  { url: "https://discord.com/invite/hJJvXP7C73", icon: DiscordSvg },
];

function Footer() {
  return (
    <footer
      className={"text-center bottom-0 position-sticky left-0 right-0 w-100"}
    >
      <div>
        {footerLinks.map((link, k) => (
          <Link to={link.url} key={k} target={"_blank"} className="mx-2">
            <IconButton>
              <img src={link.icon} alt="svg-medium" width={20} height={20} />
            </IconButton>
          </Link>
        ))}
      </div>
      <Link
        to="https://get.orbiter.finance/Orbiter_Finance_Terms_of_Use.pdf"
        target={"_blank"}
      >
        Terms of use
      </Link>
    </footer>
  );
}

export default Footer;

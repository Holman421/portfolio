import { Box } from "@mui/material";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type NavLinkProps = {
  label: string;
  number: string;
  to: string;
};

const NavLink: React.FC<NavLinkProps> = ({
  label,
  number,
  to,
}) => {
  const [text, setText] = useState(label);
  const [width, setWidth] = useState(0);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseOver = () => {
    let iteration = 0;

    const interval = setInterval(() => {
      const newText = text
        .split("")
        .map((letter: any, index: number) => {
          if (index < iteration) {
            return label[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      setText(newText);

      if (iteration >= label.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 35);
  };

  const handleWidth = () => {
    const computedWidth = label.length * 13 + 40; // adjust the 10 and 80 values as needed
    setWidth(computedWidth);
  };

  useEffect(() => {
    handleWidth();
  }, []);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        display: "block",
        width: `${width}px`,
        "& > button": {
          padding: ".5rem",
          display: "block",
          backgroundColor: "#213C47",
          border: "none",
          fontSize: "1rem",
          width: `${width}px`,
          "&:hover > *": {
            filter: "drop-shadow(0 0 3px #6FBDED)",
          },
          "& > *": { cursor: "pointer" },
          //bottom left corner shape
          ":after": {
            content: '""',
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "0",
            height: "0",
            borderRight: ".8rem solid transparent",
            borderBottom: ".8rem solid #111111",
          },
        },
      }}
    >
      <button>
        <Link
          to={to}
          smooth={true}
          duration={500}
          onMouseOver={handleMouseOver}
        >
          {text}
        </Link>
      </button>
      <Box
        sx={{
          filter: isHovered
            ? "drop-shadow(0 0 3px #6FBDED)"
            : "",
          position: "absolute",
          bottom: "-.6rem",
          left: ".9rem",
        }}
      ></Box>
    </Box>
  );
};

export default NavLink;

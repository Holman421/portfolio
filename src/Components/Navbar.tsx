import { Box } from "@mui/material";
import NameLogo from "./NameLogo";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        zIndex: 100,
        display: "flex",
        gap: "1.5rem",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        transition: "all 600ms ease",
      }}
    >
      <NameLogo />
      {/* <LanguageSwitcher /> */}
    </Box>
  );
};

export default Navbar;

import HeroSection from "./Sections/HeroSection";
import ProjectSection from "./Sections/ProjectSection";
import AvatarSection from "./Sections/AvatarSection";
import { Box } from "@mui/material";
import ContactMeSection from "./Sections/ContactMeSection";
import CurrentPageIndicator from "./Components/CurrentPageIndicator";
import useScreenSize from "./Utils/CustomHooks/useScreenSize";
import ReactLenis from "@studio-freight/react-lenis";

function App() {
  const isBellow650px = useScreenSize(650, "bellow");

  if (isBellow650px === null) {
    return <div>Loading</div>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
      }}
    >

      <Box
        sx={{
          minHeight: "100vh",
          maxWidth: "100vw",
          overflowX: "hidden",
          position: "relative", // Add position relative to the Box
        }}
      >
        {/* Background Effect - must be first in DOM */}
        {/* <GradientGlassEffect /> */}

        {/* Main Content - positioned above background */}
        <CurrentPageIndicator />
        <HeroSection />
        <ProjectSection />
        <AvatarSection />
        <ContactMeSection />
      </Box>
    </ReactLenis>
  );
}

export default App;

import { useMediaQuery } from "@mui/material";

export const useMedia = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return { isMobile };
};

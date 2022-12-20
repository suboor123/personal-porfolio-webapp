
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GlobalHelpers } from "src/helpers/global-helpers";

export interface HasPathname {
}

interface Props {
}

function RouteChangeDetector(props: Props) {
  const location = useLocation();

  useEffect(() => {
    GlobalHelpers.closeSidebar()
  }, [location.pathname])
  return <></>;
}

export default RouteChangeDetector;

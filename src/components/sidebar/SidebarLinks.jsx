import React, { useCallback } from "react";
import { usePathname } from "next/navigation";
import LinkItem from "./LinkItem";
import MenuItem from "./MenuItem";

const SidebarLinks = ({ routes, mainPath }) => {
  const pathname = usePathname();

  const activeRoute = useCallback(
    (routeName) => {
      if (pathname === routeName) {
        return true;
      }
      return routeName !== "/" && pathname.includes(routeName);
    },
    [pathname]
  );

  const createLinks = (routes) => {
    return routes?.map((route, index) => {
      return route.menuLinks ? (
        <MenuItem key={index} activeRoute={activeRoute} route={route} />
      ) : (
        <LinkItem
          key={index}
          activeRoute={activeRoute}
          route={route}
          mainPath={mainPath}
        />
      );
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;

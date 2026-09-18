import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RouteState {
  path: string;
  params: Record<string, string>;
  query: Record<string, string>;
}

interface RouterContextType {
  route: RouteState;
  navigate: (to: string, options?: { replace?: boolean; scroll?: boolean }) => void;
  pathname: string;
  searchParams: URLSearchParams;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function parseCurrentLocation(): RouteState {
  // Support both clean pathname and hash-based fallback (e.g., #/shop or /shop)
  let rawPath = window.location.pathname;
  let rawSearch = window.location.search;

  if (window.location.hash.startsWith('#/')) {
    const hashContent = window.location.hash.slice(1); // e.g. "/shop?q=test"
    const [hPath, hSearch] = hashContent.split('?');
    rawPath = hPath || '/';
    if (hSearch) rawSearch = '?' + hSearch;
  }

  // Normalize path
  if (!rawPath || rawPath === '') rawPath = '/';

  const searchParams = new URLSearchParams(rawSearch);
  const query: Record<string, string> = {};
  searchParams.forEach((val, key) => {
    query[key] = val;
  });

  const params: Record<string, string> = {};

  // Pattern matching
  if (rawPath.startsWith('/category/')) {
    params.slug = rawPath.replace('/category/', '').split('/')[0] || '';
  } else if (rawPath.startsWith('/collection/')) {
    params.slug = rawPath.replace('/collection/', '').split('/')[0] || '';
  } else if (rawPath.startsWith('/product/')) {
    params.id = rawPath.replace('/product/', '').split('/')[0] || '';
    params.slug = params.id;
  } else if (rawPath.startsWith('/orders/')) {
    params.id = rawPath.replace('/orders/', '').split('/')[0] || '';
  }

  return {
    path: rawPath,
    params,
    query
  };
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(parseCurrentLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(parseCurrentLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (to: string, options: { replace?: boolean; scroll?: boolean } = {}) => {
    const { replace = false, scroll = true } = options;

    try {
      if (replace) {
        window.history.replaceState({}, '', to);
      } else {
        window.history.pushState({}, '', to);
      }
    } catch {
      // If pushState is blocked by sandboxed iframe with different origin, fallback to hash
      window.location.hash = to.startsWith('/') ? '#' + to : '#/' + to;
    }

    setRoute(parseCurrentLocation());

    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const searchParams = new URLSearchParams(window.location.search);

  return (
    <RouterContext.Provider value={{ route, navigate, pathname: route.path, searchParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  replace?: boolean;
  scroll?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  replace = false,
  scroll = true,
  onClick,
  ...rest
}) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Only intercept local links
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      href.startsWith('/')
    ) {
      e.preventDefault();
      navigate(href, { replace, scroll });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

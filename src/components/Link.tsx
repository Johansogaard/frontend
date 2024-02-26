import { FC, ReactNode, MouseEvent } from "react";

interface LinkProps {
  to: string;
  className?: string; 
  target?: string;
  rel?: string;
  children: ReactNode;

}

const Link: FC<LinkProps> = ({ to, children, className, target, rel }) => { // Add className here
  const preventReload = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.history.pushState({}, "", to);
    const navigationEvent = new PopStateEvent("navigate");
    window.dispatchEvent(navigationEvent);
  };
  return (
    <a href={to} onClick={preventReload} className={className} target={target} rel={rel}> 
      {children}
    </a>
  );
};

export default Link;
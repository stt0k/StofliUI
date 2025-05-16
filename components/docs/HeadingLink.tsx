import React, { HTMLAttributes } from "react";

interface HeadingLinkProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

const HeadingLink: React.FC<HeadingLinkProps> = ({
  as: Component = "h2",
  id,
  children,
  className = "",
  ...props
}) => {
  // Si no tenemos un ID, simplemente renderizamos el encabezado normal
  if (!id) {
    return React.createElement(Component, { className, ...props }, children);
  }

  return (
    <div className="relative group">
      {React.createElement(
        Component,
        {
          id,
          className: `relative flex items-center ${className}`,
          ...props,
        },
        <>
          {children}
          <a
            href={`#${id}`}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-lg"
            aria-label={`Enlace a ${
              typeof children === "string" ? children : "esta sección"
            }`}
          >
            #
          </a>
        </>
      )}
    </div>
  );
};

export default HeadingLink;

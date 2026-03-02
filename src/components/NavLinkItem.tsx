type NavLinkItemProps = {
    label: string;
    href: string;
    onClick: () => void;
  };
  
 export  const NavLinkItem = ({ label, href, onClick }: NavLinkItemProps) => {
    return (
      <a
        href={href}
        className="group hover:text-white text-gray-400 transition-colors duration-300"
        onClick={onClick}
      >
        {label}
        <div
          className="
            relative w-20 h-2 bg-red-600 left-28
            transform scale-x-0 translate-x-3
            transition-transform duration-300 origin-right
            group-hover:scale-x-100
            group-hover:translate-x-0
          "
        />
      </a>
    );
  };


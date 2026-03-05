type NavLinkItemProps = {
    label: string;
    href: string;
    onClick: () => void;
  };
  
 export  const NavLinkItem = ({ label, href, onClick }: NavLinkItemProps) => {
    return (
      <a
        href={href}
        className="group hover:text-white text-left text-gray-400 transition-colors duration-300 text-thin"
        onClick={onClick}
      >
        {label}
        <div
          className="
            relative w-16 h-[3.5px] mt-2 bg-red-600 self-baseline
            transform scale-x-0 translate-x-full
            transition-transform duration-700 origin-right
            group-hover:scale-x-100
            group-hover:translate-x-0
          "
        />
      </a>
    );
  };


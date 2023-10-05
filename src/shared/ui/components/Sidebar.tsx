import {
  faCertificate,
  faHeadSideVirus,
  faHouse,
  faPercent,
  faShield,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      if (e.clientX < window.innerWidth / 25) {
        setShowSidebar(true);
      } else if (e.clientX > window.innerWidth / 6) {
        setShowSidebar(false);
      }
    };

    // function for hide sidebar
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientX > window.innerWidth / 2) {
        setShowSidebar(false);
        console.log("hide sidebar");
      }
    };

    window.addEventListener("mousemove", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={
        showSidebar
          ? { transform: "translateX(0)", left: "0" }
          : { transform: "translateX(-100%)", left: "20px" }
      }
      className="font-text fixed top-[120px] z-10 flex flex-col flex-shrink-0 w-64 h-full transition-all duration-300 transform"
    >
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 pl-[10px]"
        aria-label="Sidebar"
      >
        <div className="h-max px-3 py-4 overflow-y-auto dark:bg-gray-800 bg-[#dfa7cc] rounded-xl">
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-[#6b2b56af] dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faHouse} />
                <span className="ml-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/product"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-[#6b2b56af] dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faTag} />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a
                href="/brand"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-[#6b2b56af] dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faShield} />
                <span className="flex-1 ml-3 whitespace-nowrap">Marques</span>
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-[#6b2b56af] dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faCertificate} />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Catégories
                </span>
              </a>
            </li>
            <li>
              <a
                href="/discount"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-[#6b2b56af] dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faPercent} />
                <span className="flex-1 ml-3 whitespace-nowrap">Réduction</span>
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:text-white hover:bg-[#6b2b56af] dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faHeadSideVirus} />
                <span className="flex-1 ml-3 whitespace-nowrap">Compte</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

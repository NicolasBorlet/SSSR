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
      if (e.clientX < window.innerWidth / 10) {
        setShowSidebar(true);
      } else {
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
          ? { transform: "translateX(0)" }
          : { transform: "translateX(-100%)" }
      }
      className="fixed top-0 left-0 z-10 flex flex-col flex-shrink-0 w-64 h-full overflow-hidden transition-all duration-300 transform bg-white border-r dark:bg-gray-800 dark:border-gray-600"
    >
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faHouse} />
                <span className="ml-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/product"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faTag} />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a
                href="/brand"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faShield} />
                <span className="flex-1 ml-3 whitespace-nowrap">Marques</span>
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faPercent} />
                <span className="flex-1 ml-3 whitespace-nowrap">Réduction</span>
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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

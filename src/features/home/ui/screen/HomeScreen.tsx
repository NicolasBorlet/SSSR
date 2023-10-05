import React, { useEffect, useState } from "react";
import {
  faCartShopping,
  faChartLine,
  faDollar,
  faPlus,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { tokenState } from "../../atoms/homeAtom";
import jwt_decode from "jwt-decode";

type Item = {
  id: string; // Ajoutez le champ 'id' pour identifier chaque élément
  name: string;
  description: string;
  icon: any;
  url?: string;
};

const HomeScreen = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [addedItems, setAddedItems] = useState<Item[]>([]);
  const [showList, setShowList] = useState(false);
  const [userList, setUserList] = useState<string[]>([]); // Stocke les ids des éléments de l'utilisateur
  const [userData, setUserData] = useState<any>([]);
  const [userDashboard, setUserDashboard] = useState<string[]>([]); // Store the item IDs in the user's dashboard

  useEffect(() => {
    // Load the previously added item ids from localStorage when the component mounts
    const storedItemIds = localStorage.getItem("addedItemIds");
    if (storedItemIds) {
      const storedItemIdsArray = JSON.parse(storedItemIds);
      setUserList(storedItemIdsArray);
    }

    // Initialize the addedItems state with the items from userDashboard
    const itemsFromUserDashboard = itemList.filter((item) =>
      userDashboard.includes(item.id)
    );
    setAddedItems(itemsFromUserDashboard);
  }, []);

  useEffect(() => {
    console.log(token);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken: any = jwt_decode(storedToken);
      setUserData(decodedToken);
      setUserDashboard(decodedToken.dashboard);
    }

    console.log("userDashboard", userDashboard);
    console.log("userData", userData);
  }, [token]);

  useEffect(() => {
    // Update localStorage with the added item ids whenever userList changes
    localStorage.setItem("addedItemIds", JSON.stringify(userList));
  }, [userList]);

  const handleAddItem = (item: Item) => {
    setAddedItems((prevItems) => {
      if (!prevItems.some((prevItem) => prevItem.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });

    // Ajoute l'id de l'item à userList si ce n'est pas déjà présent
    if (!userList.includes(item.id)) {
      setUserList((prevUserList) => [...prevUserList, item.id]);
    }

    setShowList(false);
  };

  const handleRemoveItem = (item: Item) => {
    setAddedItems((prevItems) =>
      prevItems.filter((addedItem) => addedItem.id !== item.id)
    );

    // Retire l'id de l'item de userList
    setUserList((prevUserList) =>
      prevUserList.filter((itemId) => itemId !== item.id)
    );
  };

  const itemList: Item[] = [
    {
      id: "1",
      name: "Statistiques",
      description: "Consultés les statistiques de la boutique",
      icon: faChartLine,
      url: "",
    },
    {
      id: "2",
      name: "Comptes",
      description: "Consultés les comptes de la boutique",
      icon: faUser,
    },
    {
      id: "3",
      name: "Commandes",
      description: "Consultés les commandes de la boutique",
      icon: faCartShopping,
    },
    {
      id: "4",
      name: "Ventes",
      description: "Consultés les ventes de la boutique",
      icon: faDollar,
    },
  ];

  useEffect(() => {
    console.log(token);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedToken: any = jwt_decode(storedToken);
      setUserData(decodedToken);
      setUserDashboard(decodedToken.dashboard);

      // Initialize the addedItems state with the items from userDashboard
      const itemsFromUserDashboard = itemList.filter((item) =>
        decodedToken.dashboard.includes(item.id)
      );
      setAddedItems(itemsFromUserDashboard);
    }

    console.log("userDashboard", userDashboard);
    console.log("userData", userData);
  }, [token]);

  const updateUserDashboard = () => {
    // Update the user dashboard with the added items
    // Convert userList to JSON
    const data = {
      UserID: userData.id,
      UserDashboard: JSON.stringify(userList),
    };

    fetch("http://localhost:3000/user/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("user dashboard updated");
          return response.json();
        } else {
          console.log("error");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("userList", userList);
  }, [userList]);

  return (
    <div className="p-[10px] text-center flex justify-center items-center flex-col">
      <div className="mb-[50px] font-text">
        <p className="text-lg font-bold">
          ⚠ Cette fonctionnalité est en cours de développement ⚠
        </p>
        <p>
          Les changement effecutés seront visibles lors de votre prochaine
          connection
        </p>
        <p>
          Lors du refresh de la page, le dashboard sera réinitialisé, penser à
          sauvegarder vos modifications
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 max-w-5xl w-full font-text">
        {addedItems.map((item) => (
          <div
            key={item.name}
            className="bg-[#980066] text-white rounded-lg p-[10px] text-center flex flex-col gap-3 hover:scale-110 transform transition-all duration-300 ease-out cursor-pointer relative"
          >
            <span
              className="absolute top-1 right-3 text-white cursor-pointer hover:text-black z-50"
              onClick={() => handleRemoveItem(item)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <div className="flex flex-col gap-1">
              <p>{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </div>
            <div>
              <FontAwesomeIcon icon={item.icon} />
            </div>
          </div>
        ))}
        <div
          className="bg-[#980066] text-white rounded-lg p-[10px] text-center flex flex-col gap-3 hover:scale-110 transform transition-all duration-300 cursor-pointer"
          onClick={() => setShowList(true)}
        >
          <div className="flex flex-col gap-1">
            <p>Ajouter</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      </div>
      {showList && (
        <div className="absolute z-10 mt-2 p-4 bg-[#dfa7ccf9] rounded-lg shadow-md w-[50%] font-text">
          <ul className="relative text-center flex justify-center items-center flex-col gap-2">
            {itemList
              .filter(
                (item) =>
                  !addedItems.some((addedItem) => addedItem.id === item.id)
              ) // filter out items already in addedItems
              .map((item) => (
                <li
                  key={item.name}
                  className="cursor-pointer p-2 hover:bg-[#6b2b56af] hover:text-white w-fit rounded-lg border border-[#6b2b56af]"
                  onClick={() => handleAddItem(item)}
                >
                  {item.name}
                </li>
              ))}
            <li className="cursor-pointer p-2 bg-[#6b2b56af] text-white w-fit rounded-lg mt-[20px]">
              Créer son widget
            </li>
            <div
              onClick={() => setShowList(false)}
              className="cursor-pointer absolute top-0 right-0 z-50 border border-[#6b2b56af] px-3 rounded-lg hover:bg-[#6b2b56af] hover:text-white"
            >
              <button>x</button>
            </div>
          </ul>
        </div>
      )}

      <button
        className="mt-5 font-text bg-[#980066] text-white rounded-lg p-[10px] text-center flex flex-col gap-3 hover:scale-110 transform transition-all duration-300 cursor-pointer"
        onClick={updateUserDashboard}
      >
        Enregistrer
      </button>
    </div>
  );
};

export default HomeScreen;

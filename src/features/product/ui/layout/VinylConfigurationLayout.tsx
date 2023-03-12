import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { productAtom } from "../../atoms/ProductAtoms";
import { ProductVinyl } from "../../types/product";

const VinylConfigurationLayout = () => {
  const { id } = useParams();
  const [products, setProducts] = useRecoilState(productAtom);
  const [vinylData, setVinylData] = useState([]);
  const [Edit, setEdit] = useState(false);

  useEffect(() => {
    //fetch vinyl data
    fetch(`http://localhost:3000/vinyl/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("vinylData", data);
        setVinylData(data);
      });
  }, []);

  const addVinyl = (vinyl: ProductVinyl) => {
    // fetch data from API
    fetch(`http://localhost:3000/vinyl/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(vinyl),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts([...products, data]);
        window.location.reload();
        console.log(data);
      });
  };

  const updateVinyl = (vinyl: ProductVinyl) => {
    // fetch data from API
    fetch(`http://localhost:3000/vinyl/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(vinyl),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts([...products, data]);
        // window.location.href = "/product/${product.ProductID}/configuration";
        console.log(data);
      });
  };

  return (
    <>
      {vinylData.length === 0 ? (
        <div>
          <h1>Vinyl Configuration</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addVinyl({
                ProductID: id,
                VinylArtist: e.currentTarget.VinylArtist.value,
                VinylDuration: e.currentTarget.VinylDuration.value,
                VinylAlbum: e.currentTarget.VinylAlbum.value,
                VinylLabel: e.currentTarget.VinylLabel.value,
                VinylPrice: e.currentTarget.VinylPrice.value,
              });
            }}
            className="flex flex-col p-3"
          >
            <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Artiste
              <input
                type="text"
                placeholder="Artiste"
                name="VinylArtist"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </label>
            <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Durée
              <input
                type="text"
                placeholder="Durée"
                name="VinylDuration"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </label>
            <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Album
              <input
                type="text"
                placeholder="Album"
                name="VinylAlbum"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </label>
            <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Label
              <input
                type="text"
                placeholder="Label"
                name="VinylLabel"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </label>
            <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Prix
              <input
                type="number"
                placeholder="Prix"
                name="VinylPrice"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
            </label>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-200 transform bg-blue-500 rounded-md dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-600 dark:focus:bg-blue-600"
            >
              Configurer
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Configuration du produit</h1>
          <div className="">
            <div className="rounded-md p-5"></div>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Artiste
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Durée
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Album
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Label
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Prix
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {vinylData.map((vinyl: any) => (
                  <tr key={vinyl.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {vinyl.VinylArtist}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {vinyl.VinylDuration}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {vinyl.VinylAlbum}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {vinyl.VinylLabel}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {vinyl.VinylPrice}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                          aria-label="Edit"
                          onClick={() => {
                            setVinylData(vinyl);
                            setEdit(true);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default VinylConfigurationLayout;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import DataTableLoader from "../../../../shared/ui/loader/DataTableLoader";
import { brandAtom } from "../../atoms/BrandAtoms";

const BrandListingLayout = () => {
  const [brands, setBrands] = useRecoilState(brandAtom);
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      const signal = controller.signal;
      // fetch data from API
      fetch("http://localhost:3000/brand/", { signal: signal })
        .then((res) => res.json())
        .then((data) => {
          // set data to state
          setBrands(data);
          setIsLoad(true);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        controller.abort();
      };
    }, //load only once when component is mounted
    [setBrands]
  );

  //function to delete brand
  const deleteBrand = (id: number) => {
    const controller = new AbortController();
    const signal = controller.signal;

    // fetch data from API
    fetch(`http://localhost:3000/brand/${id}`, {
      method: "DELETE",
      signal: signal,
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands(brands.filter((brand) => brand.BrandID !== id));
        navigate("/brand");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  };

  return (
    <div className="m-5 w-[80%]">
      <h1>Toutes les marques</h1>
      {isLoad ? (
        <div>
          <table className="w-full leading-normal border">
            <thead>
              <tr>
                <th className="bg-blue-700  rounded-tl-lg px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Supprimer
                </th>
                <th className="px-5 py-3 rounded-tr-lg border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.BrandID}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {brand.BrandName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {brand.BrandDesc}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => deleteBrand(brand.BrandID)}
                          >
                            Supprimer
                          </button>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                              navigate(`/brand/${brand.BrandID}`);
                              console.log(brand.BrandID);
                            }}
                          >
                            Modifier
                          </button>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <DataTableLoader />
      )}
    </div>
  );
};

export default BrandListingLayout;

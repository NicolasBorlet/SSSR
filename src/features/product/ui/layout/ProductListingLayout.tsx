import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productAtom } from "../../atoms/ProductAtoms";

const ProductListingLayout = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // fetch data from API
    fetch("http://localhost:3000/product/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts(data);
        console.log(data);
      });

    //fetch brand data
    fetch("http://localhost:3000/brand/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands(data);
        console.log(data);
      });
  }, []);

  //function to delete product
  const deleteProduct = (id: string) => {
    // fetch data from API
    fetch(`http://localhost:3000/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text();
      })
      .then((data) => {
        console.log(id);
        window.location.href = "/product";
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5 w-full">
      <h1 className="pb-3">Tous les produits</h1>
      <div>
        <div className="rounded-md">
          <table className="min-w-full leading-normal border">
            <thead>
              <tr>
                <th className="px-5 rounded-tl-lg text-center py-3 border-b-2 border-gray-200 text-white bg-blue-700 text-xs font-semibold uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Carte Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Marque
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Supprimer
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Edit
                </th>
                <th className="px-5 rounded-tr-lg py-3 border-b-2 border-gray-200 bg-blue-700 text-center text-xs font-semibold text-white uppercase tracking-wider">
                  Configurer les variations
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ProductID} className="">
                  <td className="px-5 py-5 border-b text-center bg-gray-50 border-gray-200 text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 whitespace-no-wrap">
                          {product.ProductName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <p className="whitespace-no-wrap text-sm font-medium text-gray-900">
                      {product.ProductID}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    {product.type === "shoes" ? (
                      <span className="focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {product.type}
                      </span>
                    ) : (
                      <p className="focus:outline-none text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        {product.type}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <p className="text-sm font-medium text-gray-900 whitespace-no-wrap">
                      {product.ProductShortDesc}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <p className="text-sm font-medium text-gray-900 whitespace-no-wrap">
                      {brands.map((brand: any) => {
                        if (brand.BrandID === product.BrandID) {
                          return brand.BrandName;
                        }
                      })}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <button
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      onClick={() => deleteProduct(product.ProductID)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <a
                      href={`/product/${product.ProductID}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <a
                      href={`/product/${product.ProductID}/configuration`}
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Configuration
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductListingLayout;

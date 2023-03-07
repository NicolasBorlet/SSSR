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
      <h1>Tous les produits</h1>
      <div className="rounded-lg bg-blue-100">
        <div className="rounded-md p-5">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 rounded-tl-lg text-center py-3 border-b-2 border-gray-200 bg-blue-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Carte Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Marque
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Supprimer
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Edit
                </th>
                <th className="px-5 rounded-tr-lg py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Configurer les variations
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ProductID} className="">
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.ProductName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {product.ProductID}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    {product.type === "shoes" ? (
                      <span className="text-gray-900 bg-green-200 rounded-lg whitespace-no-wrap p-2">
                        {product.type}
                      </span>
                    ) : (
                      <p className="text-gray-900 bg-yellow-200 rounded-sm whitespace-no-wrap">
                        {product.type}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {product.ProductShortDesc}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {brands.map((brand: any) => {
                        if (brand.BrandID === product.BrandID) {
                          return brand.BrandName;
                        }
                      })}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => deleteProduct(product.ProductID)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <a
                      href={`/product/${product.ProductID}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <a
                      href={`/product/${product.ProductID}/configuration`}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
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

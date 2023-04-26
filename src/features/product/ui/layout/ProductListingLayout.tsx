import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { productAtom } from "../../atoms/ProductAtoms";

const ProductListingLayout = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

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

    //fetch category data
    fetch("http://localhost:3000/productcategorie/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setCategories(data);
        console.log(data);
      });
  }, [setProducts, setBrands, setCategories]);

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
    <div className="m-5">
      <div className="flex justify-between">
        <h1 className="pb-3">Tous les produits</h1>
      </div>
      <div>
        <div className="rounded-md">
          <table className="leading-normal border">
            <thead>
              <tr>
                <th
                  className="px-5 rounded-tl-lg text-center py-3 border-b-2 border-gray-200 text-white bg-blue-700 text-xs font-semibold uppercase tracking-wider"
                  scope="col"
                >
                  Image
                </th>
                <th className="px-5 text-center py-3 border-b-2 border-gray-200 text-white bg-blue-700 text-xs font-semibold uppercase tracking-wider">
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
                  Catégorie
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
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          // create src={`http://localhost:3001/images/${product.ProductThumb}`} without fakepath
                          src={`http://localhost:3001/images/${product.ProductThumb}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
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
                      <span className="focus:outline-none text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        {product.type}
                      </span>
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
                    <p className="text-sm font-medium text-gray-900 whitespace-no-wrap">
                      {categories.map((category: any) => {
                        if (category.CategorieID === product.CategorieID) {
                          return category.CategorieName;
                        }
                        if (product.CategorieID === null) {
                          return "Aucune catégorie";
                        }
                      })}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-200 dark:hover:bg-red-200 dark:focus:ring-red-200"
                      onClick={() => deleteProduct(product.ProductID)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <a
                      href={`/product/${product.ProductID}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-gray-50 text-sm">
                    <a
                      href={`/product/${product.ProductID}/configuration`}
                      className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
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

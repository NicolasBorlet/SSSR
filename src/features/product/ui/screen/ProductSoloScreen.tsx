import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Layout from "../../../../shared/ui/layout/Layout";
import { categorieAtom } from "../../../categorie/atoms/categorieAtom";
import { productAtom } from "../../atoms/ProductAtoms";
import { Product } from "../../types/product";

const ProductSoloScreen = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [productShortDesc, setProductShortDesc] = useState("");
  const [productLongDesc, setProductLongDesc] = useState("");
  const [productCartDesc, setProductCartDesc] = useState("");
  const [productThumb, setProductThumb] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [type, setType] = useState("");
  const [categories, setCategories] = useRecoilState(categorieAtom);

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data); // Update the state with the fetched data
        setProduct(data[0]);
        setName(data[0].ProductName);
        setProductCartDesc(data[0].ProductCartDesc);
        setProductShortDesc(data[0].ProductShortDesc);
        setProductLongDesc(data[0].ProductLongDesc);
        setProductStock(data[0].ProductStock);
        setType(data[0].type);
        console.log(data);
        console.log("type", type);
      });

    //fetch category data
    fetch("http://localhost:3000/productcategorie/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setCategories(data);
        console.log(data);
      });
  }, []);

  const handleUpdate = () => {
    fetch(`http://localhost:3000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductName: name,
        ProductCartDesc: productCartDesc,
        ProductShortDesc: productShortDesc,
        ProductLongDesc: productLongDesc,
        ProductStock: productStock,
        ProductCategorieID: categories,
      }),
    })
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setProduct(data[0]);
        window.location.href = "/product";
      })
      .catch((err) => console.log(err));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="m-5">
        <div className="p-3">
          <h2>Update Product</h2>
          <div className="flex flex-col flex-center justify-start mt-3">
            <form>
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Catégorie du produit
              </label>
              <select
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={product.ProductCategorieID}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    ProductCategorieID: e.target.value,
                  });
                }}
              >
                {categories.map((categorie) => (
                  <>
                    <option
                      key={categorie.CategorieID}
                      value={categorie.CategorieID}
                    >
                      {categorie.CategorieName}
                    </option>
                    <option value="NULL">-</option>
                  </>
                ))}
              </select>
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom du produit
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ID du produit
              </label>
              <input
                disabled
                type="text"
                value={product.ProductID}
                className="shadow-sm bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Type de produit
              </label>
              <input
                disabled
                type="text"
                value={product.type}
                className="shadow-sm bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description de la carte
              </label>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={productCartDesc}
                onChange={(e) => setProductCartDesc(e.target.value)}
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description courte
              </label>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={productShortDesc}
                onChange={(e) => setProductShortDesc(e.target.value)}
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description longue
              </label>
              <textarea
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={productLongDesc}
                onChange={(e) => setProductLongDesc(e.target.value)}
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Stock du produit
              </label>
              <input
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(Number(e.target.value))}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              <button
                className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="submit"
                onClick={handleUpdate}
              >
                Mettre à jour le produit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductSoloScreen;

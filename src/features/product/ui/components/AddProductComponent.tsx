import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { brandAtom } from "../../../brand/atoms/BrandAtoms";
import { productAtom, productTypeAtom } from "../../atoms/ProductAtoms";
import { Product } from "../../types/product";

const AddProductComponent = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [brands, setBrands] = useRecoilState(brandAtom);
  const [types, setTypes] = useRecoilState(productTypeAtom);

  //useEffect for fetch brand data
  useEffect(() => {
    // fetch data from API
    fetch("http://localhost:3000/brand/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands(data);
        console.log(data);
      });
  }, []);

  //function to update type of product
  const updateType = (e: any) => {
    setTypes(e.currentTarget.value);
  };

  useEffect(() => {
    console.log(types);
  }, [types]);

  // function to add product
  const addProduct = (product: Product) => {
    // fetch data from API
    fetch("http://localhost:3000/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "/product";
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <div className="m-5 overflow-y-scroll h-[90vh]">
      <h1 className="mb-3">Ajouter un produit</h1>
      <div>
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct({
              ProductID: null,
              ProductName: e.currentTarget.productName.value,
              ProductCartDesc: e.currentTarget.productCartDesc.value,
              ProductShortDesc: e.currentTarget.productShortDesc.value,
              ProductLongDesc: e.currentTarget.productLongDesc.value,
              ProductStock: e.currentTarget.productStock.value,
              ProductThumb: e.currentTarget.productImage.value,
              type: e.currentTarget.productType.value,
              BrandID: e.currentTarget.BrandID.value,
            });
          }}
        >
          <select
            name="productType"
            onChange={updateType}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="shoes">Chaussures</option>
            <option value="vinyl">Vinyl</option>
          </select>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nom du produit:
            <input
              type="text"
              name="productName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description carte du produit:
            <textarea
              name="productCartDesc"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description courte du produit:
            <textarea
              name="productShortDesc"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description longue du produit:
            <textarea
              name="productLongDesc"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Stock du produit:
            <input
              type="number"
              name="productStock"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image du produit:
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="product_image_help"
              name="productImage"
              id="productImage"
              type="file"
            ></input>
          </label>
          {types === "shoes" ? (
            <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Marque du produit:
              <select
                name="BrandID"
                typeof="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {brands.map((brand) => (
                  <option value={brand.BrandID}>{brand.BrandName}</option>
                ))}
              </select>
            </label>
          ) : (
            <></>
          )}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Ajouter le produit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductComponent;

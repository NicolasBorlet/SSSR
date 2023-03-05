import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { brandAtom } from "../../../brand/atoms/BrandAtoms";
import { productAtom } from "../../atoms/ProductAtoms";
import { Product } from "../../types/product";

const AddProductComponent = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [brands, setBrands] = useRecoilState(brandAtom);
  const [types, setTypes] = useState("chaussure");

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
    fetch(`http://localhost:3000/product/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts([...products, data]);
        window.location.href = "/product";
        console.log(data);
      });

    //if product type is shoes, add product to shoes table
    if (product.type === "shoes") {
      fetch(`http://localhost:3000/shoessize/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          // set data to state
          setProducts([...products, data]);
          window.location.href = "/product";
          console.log(data);
        });
    }

    //if product type is vinyl, add product to vinyl table
    if (product.type === "vinyl") {
      fetch(`http://localhost:3000/vinyl/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          // set data to state
          setProducts([...products, data]);
          window.location.href = "/product";
          console.log(data);
        });
    }
  };

  return (
    <div className="m-5">
      <h1>Ajouter un produit</h1>
      <div className="bg-blue-100 rounded-lg p-3">
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
              BrandID: e.currentTarget.productBrand.value,
              ShoesSize: e.currentTarget.ShoesSize.value,
              ShoesSizePrice: e.currentTarget.ShoesSizePrice.value,
              ShoesSizeQuantity: e.currentTarget.ShoesSizeQuantity.value,
            });
          }}
        >
          <select
            name="productType"
            className="self-start"
            onChange={updateType}
          >
            <option value="shoes">Chaussures</option>
            <option value="vinyl">Vinyl</option>
          </select>
          <label className="bg-blue-200 p-3 rounded-lg self-start">
            Nom du produit:
            <input type="text" name="productName" />
          </label>
          <label className="bg-blue-200 p-3 rounded-lg self-start">
            Description carte du produit:
            <textarea name="productCartDesc" />
          </label>
          <label className="bg-blue-200 p-3 rounded-lg self-start">
            Description courte du produit:
            <textarea name="productShortDesc" />
          </label>
          <label className="bg-blue-200 p-3 rounded-lg self-start">
            Description longue du produit:
            <textarea name="productLongDesc" />
          </label>
          <label className="bg-blue-200 p-3 rounded-lg self-start">
            Stock du produit:
            <input type="number" name="productStock" />
          </label>
          <label className="bg-blue-200 p-3 rounded-lg self-start">
            Image du produit:
            <input type="file" name="productImage" />
          </label>

          {types === "shoes" ? (
            <>
              <label className="bg-blue-200 p-3 rounded-lg self-start">
                Marque du produit:
                <select name="productBrand">
                  {brands.map((brand) => (
                    <option value={brand.BrandID}>{brand.BrandName}</option>
                  ))}
                </select>
              </label>
              <label className="bg-blue-200 p-3 rounded-lg self-start">
                Taille du produit:
                <input type="number" name="ShoesSize" />
              </label>
              <label className="bg-blue-200 p-3 rounded-lg self-start">
                Prix du produit:
                <input type="number" name="ShoesSizePrice" />
              </label>
              <label className="bg-blue-200 p-3 rounded-lg self-start">
                Quantité du produit:
                <input type="number" name="ShoesSizeQuantity" />
              </label>
            </>
          ) : (
            <></>
          )}

          <button className="bg-blue-300 rounded-lg px-2 py-1" type="submit">
            Ajouter le produit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductComponent;

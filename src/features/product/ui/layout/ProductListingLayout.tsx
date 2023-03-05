import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productAtom } from "../../atoms/ProductAtoms";

const ProductListingLayout = () => {
  const [products, setProducts] = useRecoilState(productAtom);

  useEffect(() => {
    // fetch data from API
    fetch("http://localhost:3000/product/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts(data);
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
      <div className="bg-blue-100 rounded-lg p-3">
        <ul>
          {products.map((product) => (
            <li
              key={product.ProductID}
              className="bg-blue-200 rounded-lg p-3 m-5"
            >
              <h2
                className="text-2xl font-bold"
                suppressContentEditableWarning={true}
              >
                {product.ProductName}
              </h2>
              <p className="text-xl" suppressContentEditableWarning={true}>
                ProductShortDesc : {product.ProductShortDesc}
              </p>
              <button
                className="bg-blue-300 rounded-lg px-2 py-1 mr-5"
                onClick={() => deleteProduct(product.ProductID)}
              >
                Supprimer
              </button>
              <button
                className="bg-blue-300 rounded-lg px-2 py-1"
                //on click go to edit page
                onClick={() => {
                  window.location.href = `/product/${product.ProductID}`;
                }}
              >
                Voir et Modifier
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductListingLayout;

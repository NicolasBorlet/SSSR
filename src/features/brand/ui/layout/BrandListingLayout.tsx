import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { brandAtom } from "../../atoms/BrandAtoms";

export interface Brand {
  BrandID: any;
  BrandName: string;
  BrandDesc: string;
}

const BrandListingLayout = () => {
  const [editable, setEditable] = useState(false);
  const [brands, setBrands] = useRecoilState(brandAtom);

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

  //function to delete brand
  const deleteBrand = (id: number) => {
    // fetch data from API
    fetch(`http://localhost:3000/brand/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands(brands.filter((brand) => brand.BrandID !== id));
        console.log(data);
      });
  };

  if (!brands) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5 w-full">
      <h1>Toutes les marques</h1>
      <div className="bg-blue-100 rounded-lg p-3">
        <ul>
          {brands.map((brand) => (
            <li key={brand.BrandID} className="bg-blue-200 rounded-lg p-3 m-5">
              <h2
                className="text-2xl font-bold"
                contentEditable={editable}
                suppressContentEditableWarning={true}
              >
                {brand.BrandName}
              </h2>
              <p
                className="text-xl"
                contentEditable={editable}
                suppressContentEditableWarning={true}
              >
                {brand.BrandDesc}
              </p>
              <button
                className="bg-blue-300 rounded-lg px-2 py-1 mr-5"
                onClick={() => deleteBrand(brand.BrandID)}
              >
                Supprimer
              </button>
              <button
                className="bg-blue-300 rounded-lg px-2 py-1"
                //on click go to edit page
                onClick={() => {
                  window.location.href = `/brand/${brand.BrandID}`;
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

export default BrandListingLayout;

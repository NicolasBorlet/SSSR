import { useRecoilState } from "recoil";
import { brandAtom } from "../../atoms/BrandAtoms";
import { Brand } from "../../types/brand";

const BrandAdding = () => {
  const [brands, setBrands] = useRecoilState(brandAtom);

  // function to add brand
  const addBrand = (brand: Brand) => {
    // fetch data from API
    fetch(`http://localhost:3000/brand/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(brand),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands([...brands, data]);
        window.location.href = "/brand";
        console.log(data);
      });
  };

  return (
    <div className="m-5">
      <h1>Ajouter une marque</h1>
      <div className="bg-blue-100 rounded-lg p-3">
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            addBrand({
              BrandID: null,
              BrandName: e.currentTarget.brandName.value,
              BrandDesc: e.currentTarget.brandDesc.value,
            });
          }}
        >
          <label className="bg-blue-200 p-3 rounded-lg">
            Nom de la marque:
            <input type="text" name="brandName" />
          </label>
          <label className="bg-blue-200 p-3 rounded-lg">
            Description de la marque:
            <textarea name="brandDesc" />
          </label>
          <button className="bg-blue-300 rounded-lg px-2 py-1" type="submit">
            Ajouter la marque
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandAdding;

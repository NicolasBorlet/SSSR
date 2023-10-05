import { useRecoilState } from "recoil";
import { brandAtom } from "../../atoms/BrandAtoms";
import { Brand } from "../../types/brand";
import { ToastMessage } from "../../../../shared/ui/components/ToastMessage";

const BrandAdding = () => {
  const [brands, setBrands] = useRecoilState(brandAtom);

  // function to add brand
  const addBrand = (brand: Brand) => {
    const token = localStorage.getItem("token");
    // fetch data from API
    fetch(`http://localhost:3000/brand/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(brand),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands([...brands, data]);
        // window.location.href = "/brand";
        // console.log(data);
        ToastMessage({ message: "test", type: "success" });
      });
  };

  return (
    <div className="m-5 w-[20%]">
      <h1>Ajouter une marque</h1>
      <div className="p-3">
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
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nom de la marque:
            <input
              type="text"
              name="brandName"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description de la marque:
            <textarea
              name="brandDesc"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Ajouter la marque
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrandAdding;

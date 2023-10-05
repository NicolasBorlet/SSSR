import { useRecoilState } from "recoil";
import { categorieAtom } from "../../atoms/categorieAtom";
import { CategorieProps } from "../../types/categorie-types";

const AddCategorieComponent = () => {
  const [categorie, setCategorie] = useRecoilState(categorieAtom);

  // function to add categorie
  const addCategorie = (categorie: CategorieProps) => {
    // fetch data from API
    fetch(`http://localhost:3000/productcategorie/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(categorie),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setCategorie([data]);
        window.location.href = "/categorie";
        console.log(data);
      });
  };

  return (
    <div className="m-5 w-[20%]">
      <h1>Ajouter une catégorie</h1>
      <div className="p-3">
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            addCategorie({
              CategorieID: null,
              CategorieName: e.currentTarget.categorieName.value,
            });
          }}
        >
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nom de la catégorie:
            <input
              type="text"
              name="categorieName"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </label>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Ajouter la catégorie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategorieComponent;

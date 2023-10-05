import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { categorieAtom } from "../../atoms/categorieAtom";

const CategorieListingLayout = () => {
  const [categories, setCategories] = useRecoilState(categorieAtom);

  useEffect(() => {
    // fetch data from API
    fetch("http://localhost:3000/productcategorie/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setCategories(data);
        console.log(data);
      });
  }, [setCategories]);

  //function to delete categorie
  const deleteCategorie = (id: number) => {
    // fetch data from API
    fetch(`http://localhost:3000/productcategorie/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setCategories(
          categories.filter((categorie) => categorie.CategorieID !== id)
        );
        window.location.reload();
        console.log(data);
      });
  };

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-[80%]">
      <h1>Toutes les catégories</h1>
      <div>
        <table className="w-full leading-normal border">
          <thead>
            <tr>
              <th className="bg-blue-700 rounded-tl-lg px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold text-white uppercase tracking-wider">
                Nom
              </th>
              <th className="px-5 py-3 rounded-tr-lg border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                Supprimer
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie.CategorieID}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {categorie.CategorieName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteCategorie(categorie.CategorieID)}
                        >
                          Supprimer
                        </button>
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategorieListingLayout;

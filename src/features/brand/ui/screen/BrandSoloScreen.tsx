import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Layout from "../../../../shared/ui/layout/Layout";
import { brandAtom } from "../../atoms/BrandAtoms";
import { Brand } from "../../types/brand";

const BrandSoloScreen = () => {
  const [brands, setBrands] = useRecoilState<Brand[]>(brandAtom);
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/brand/${id}`)
      .then((res) => res.json())
      .then((data: Brand[]) => {
        setBrands(data); // Update the state with the fetched data
        setBrand(data[0]); // Set the first brand in the array as the current brand
        setName(data[0].BrandName); // Set the name and description of the brand in the state
        setDesc(data[0].BrandDesc);
      });
  }, [id, setBrands]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(event.target.value);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3000/brand/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BrandName: name,
        BrandDesc: desc,
      }),
    })
      .then((res) => res.json())
      .then((data: Brand[]) => {
        setBrands(data); // Update the state with the updated data
        setBrand(data[0]); // Set the first brand in the array as the current brand
        window.location.href = "/brand";
      });
  };

  if (!brand) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="m-5">
        <div className="p-3">
          <div className="flex flex-col flex-center justify-start mt-3">
            <form>
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Brand Name
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Brand Description
              </label>
              <textarea
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={desc}
                onChange={handleDescChange}
              />
              <button
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
                type="button"
                onClick={handleUpdate}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandSoloScreen;

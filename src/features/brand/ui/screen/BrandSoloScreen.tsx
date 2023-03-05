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
        <div className="bg-blue-100 rounded-lg p-3">
          <h2>Update Brand</h2>
          <div className="flex flex-center justify-start gap-5 mt-3">
            <p>ID: {brand.BrandID}</p>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>Name:</label>
              <input type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>Description:</label>
              <textarea value={desc} onChange={handleDescChange} />
            </div>
            <button
              className="bg-blue-300 rounded-lg px-2 py-1"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BrandSoloScreen;

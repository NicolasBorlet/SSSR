import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../../shared/ui/layout/Layout";
import ShoesConfigurationLayout from "../layout/ShoesConfigurationLayout";
import VinylConfigurationLayout from "../layout/VinylConfigurationLayout";

const ProductConfigurationScreen = () => {
  const [types, setTypes] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Information du produit", data);
        setTypes(data[0].type);
      });
  }, []);

  return (
    <Layout>
      <div className="m-5">
        <div className="p-3">
          {types === "shoes" && <ShoesConfigurationLayout />}
          {types === "vinyl" && <VinylConfigurationLayout />}
        </div>
      </div>
    </Layout>
  );
};

export default ProductConfigurationScreen;

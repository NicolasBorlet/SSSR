import Layout from "../../../../shared/ui/layout/Layout";
import AddCategorieComponent from "../components/AddCategorieComponent";
import CategorieListingLayout from "../layouts/CategorieListingLayout";

const CategorieScreen = () => {
  return (
    <Layout>
      <div className="flex">
        <CategorieListingLayout />
        <AddCategorieComponent />
      </div>
    </Layout>
  );
};

export default CategorieScreen;

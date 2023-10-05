import Layout from "../../../../shared/ui/layout/Layout";
import AddProductComponent from "../components/AddProductComponent";
import ProductListingLayout from "../layout/ProductListingLayout";

const ProductScreen = () => {
  return (
    <Layout>
      <div className="flex">
        <ProductListingLayout />
        <AddProductComponent />
      </div>
    </Layout>
  );
};

export default ProductScreen;

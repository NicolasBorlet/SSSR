import { RecoilRoot } from "recoil";
import Layout from "../../../../shared/ui/layout/Layout";
import BrandAdding from "../components/BrandAdding";
import BrandListingLayout from "../layout/BrandListingLayout";

const BrandScreen = () => {
  return (
    <Layout>
      <div className="flex">
        <BrandListingLayout />
        <BrandAdding />
      </div>
    </Layout>
  );
};

export default BrandScreen;

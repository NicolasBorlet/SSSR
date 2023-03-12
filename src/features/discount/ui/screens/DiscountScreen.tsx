import Layout from "../../../../shared/ui/layout/Layout";
import AddDiscountComponent from "../components/AddDiscountComponent";
import DiscountListing from "../layouts/DiscountListing";

const DiscountScreen = () => {
  return (
    <Layout>
      <div>
        <AddDiscountComponent />
        <DiscountListing />
      </div>
    </Layout>
  );
};

export default DiscountScreen;

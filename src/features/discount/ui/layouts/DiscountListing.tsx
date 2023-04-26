import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { discountAtom } from "../../atoms/discountAtom";

const DiscountListing = () => {
  const [discounts, setDiscounts] = useRecoilState(discountAtom);

  useEffect(() => {
    // fetch data from API
    fetch("http://localhost:3000/discount/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setDiscounts(data);
        console.log(data);
      });
  }, [setDiscounts]);

  //function to delete discount
  const deleteDiscount = (id: number) => {
    // fetch data from API
    fetch(`http://localhost:3000/discount/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setDiscounts(
          discounts.filter((discount) => discount.DiscountID !== id)
        );
        console.log(data);
      });
  };

  if (!discounts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-full">
      <h1>Toutes les réductions</h1>
      <div>
        <table className="min-w-full leading-normal border">
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
            {discounts.map((discount) => (
              <tr key={discount.DiscountID}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {discount.DiscountPercentage} %
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => deleteDiscount(discount.DiscountID)}
                      >
                        Supprimer
                      </button>
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

export default DiscountListing;

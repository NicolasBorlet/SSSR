import * as React from "react";
import { useRecoilState } from "recoil";
import { discountAtom } from "../../atoms/discountAtom";
import { DiscountProps } from "../../types/discount-type";

export interface ShoesSizeProps {
  ShoesSizeID: number;
  ShoesSize: number;
  ShoesSizePrice: number;
  ShoesSizeQuantity: number;
  ShoesSizeDiscount: number;
  ProductID: number;
}

const AddDiscountComponent = () => {
  const [discount, setDiscount] = useRecoilState(discountAtom);

  // function to add discount
  const addDiscount = (discount: DiscountProps) => {
    // fetch data from API
    fetch(`http://localhost:3000/discount/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(discount),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setDiscount([data]);
        window.location.reload();
      });
  };

  React.useEffect(() => {
    console.log(discount);
  }, [discount]);

  return (
    <div className="m-5">
      <h1>Ajouter une réduction</h1>
      <div className="p-3">
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            addDiscount({
              DiscountID: null,
              DiscountPercentage: e.currentTarget.discountPercentage.value,
            });
          }}
        >
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Pourcentage de réduction:
            <input
              type="number"
              name="discountPercentage"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </label>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Ajouter la réduction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDiscountComponent;

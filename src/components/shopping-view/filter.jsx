import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200 rounded-lg shadow-lg">
      <div className="p-4 border-b border-amber-300">
        <h2 className="text-lg font-extrabold text-amber-900">Filters</h2>
      </div>
      <div className="p-4 space-y-6">
        {Object.keys(filterOptions).map((keyItem, keyIndex) => (
          <Fragment key={keyIndex}>
            <div>
              <h3 className="text-base font-bold text-amber-800">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option, optionIndex) => (
                  <Label
                    key={`${keyItem}-${optionIndex}`}
                    className="flex font-medium items-center gap-2 text-amber-700"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="focus:ring-amber-500"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="border-amber-300" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;

import { filterOptions } from "@/config"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.keys(filterOptions).map((keyItem, keyIndex) => (
        <DropdownMenu key={keyIndex}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100">
              {keyItem} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gradient-to-b from-amber-200 via-amber-100 to-yellow-200 p-3 rounded-lg shadow-lg border border-amber-300 min-w-[200px]">
            <div className="grid gap-2">
              {filterOptions[keyItem].map((option, optionIndex) => (
                <Label
                  key={`${keyItem}-${optionIndex}`}
                  className="flex font-medium items-center gap-2 text-amber-700 cursor-pointer hover:text-amber-900"
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
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  )
}

export default ProductFilter


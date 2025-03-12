import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled, buttonClassName }) {
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || ""

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => handleInputChange(controlItem.name, e.target.value)}
            className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 focus:border-amber-500 focus:ring-amber-400 placeholder:text-amber-400 text-amber-900 shadow-inner"
          />
        )

      case "select":
        return (
          <Select onValueChange={(value) => handleInputChange(controlItem.name, value)} value={value}>
            <SelectTrigger className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 focus:border-amber-500 focus:ring-amber-400 text-amber-900 shadow-inner">
              <SelectValue placeholder={controlItem.placeholder || controlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-amber-50 border-2 border-amber-300 shadow-lg">
              {controlItem.options.map((optionItem) => (
                <SelectItem
                  key={optionItem.id}
                  value={optionItem.id}
                  className="focus:bg-amber-100 data-[selected]:bg-amber-200 data-[selected]:text-amber-900"
                >
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "textarea":
        return (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.id}
            value={value}
            onChange={(e) => handleInputChange(controlItem.name, e.target.value)}
            className="w-full min-h-[100px] bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 focus:border-amber-500 focus:ring-amber-400 placeholder:text-amber-400 text-amber-900 shadow-inner resize-vertical"
          />
        )

      default:
        return (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => handleInputChange(controlItem.name, e.target.value)}
            className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 focus:border-amber-500 focus:ring-amber-400 placeholder:text-amber-400 text-amber-900 shadow-inner"
          />
        )
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 bg-gradient-to-br from-amber-100 to-yellow-100 p-5 rounded-lg shadow-lg border border-amber-200"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {formControls.map((controlItem) => {
          // Determine if the field should span full width
          const isFullWidth = controlItem.componentType === "textarea" || controlItem.fullWidth === true

          return (
            <div className={`space-y-2 ${isFullWidth ? "sm:col-span-2" : ""}`} key={controlItem.name}>
              <Label htmlFor={controlItem.name} className="text-sm font-bold text-amber-800 flex items-center">
                {controlItem.label}
                {controlItem.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderInputsByComponentType(controlItem)}
              {controlItem.helperText && <p className="text-xs text-amber-600 italic">{controlItem.helperText}</p>}
            </div>
          )
        })}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className={
          buttonClassName ||
          "w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 font-bold py-3 text-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1"
        }
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  )
}

export default CommonForm


import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";

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
            className="w-full px-4 py-2 text-lg rounded-lg bg-amber-50 border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 placeholder-amber-400 transition-all duration-200"
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) => handleInputChange(controlItem.name, value)}
            value={value}
          >
            <SelectTrigger className="w-full px-4 py-2 text-lg rounded-lg bg-amber-50 border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 placeholder-amber-400 transition-all duration-200">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent className="bg-amber-50 text-amber-900 border-amber-300">
              {controlItem.options.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.id}
            value={value}
            onChange={(e) => handleInputChange(controlItem.name, e.target.value)}
            className="w-full px-4 py-2 text-lg rounded-lg bg-amber-50 border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 placeholder-amber-400 transition-all duration-200"
          />
        );

      default:
        return (
          <Input
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            type={controlItem.type}
            value={value}
            onChange={(e) => handleInputChange(controlItem.name, e.target.value)}
            className="w-full px-4 py-2 text-lg rounded-lg bg-amber-50 border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 placeholder-amber-400 transition-all duration-200"
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1 text-amber-800">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-4 w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-3 px-6 text-lg rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:-translate-y-1 hover:shadow-md"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

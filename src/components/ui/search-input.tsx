import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchInputProps = {
  id?: string;
  disabled?: boolean;
  placeholder?: string;
};

export function SearchInput({
  id = "site-search",
  disabled = true,
  placeholder = "Search",
}: SearchInputProps) {
  return (
    <div className="w-full max-w-xs">
      <Label htmlFor={id} className="sr-only">
        Search
      </Label>
      <Input
        id={id}
        type="search"
        name="q"
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}

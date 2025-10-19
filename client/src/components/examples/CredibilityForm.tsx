import { CredibilityForm } from "../CredibilityForm";

export default function CredibilityFormExample() {
  return (
    <div className="p-8 bg-background">
      <CredibilityForm
        onSubmit={(text) => console.log("Form submitted:", text)}
        isLoading={false}
      />
    </div>
  );
}

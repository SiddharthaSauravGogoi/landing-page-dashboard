import ProductCreationForm from "@/components/form";

const NewLandingPage = () => {
  return (
    <main className="flex flex-col min-h-screen items-center flex-col justify-center p-4 min-w-screen">
      <div className="w-[325px] p-4 bg-gray-100 border-gray-300 border rounded-[10px]">
        <h1 className="text-xl font-normal leading-tight tracking-tight text-gray-900 md:text-2xl mb-4 text-center">
          Create a new Landing Page
        </h1>
        <ProductCreationForm />
      </div>
    </main>
  );
};

export default NewLandingPage;

import StoreForm from "@/components/store/store-form";
import Image from "next/image";

const SetupPage = () => {
  return (
    <div className="">
      <div className="grid md:grid-cols-2 h-screen">
        <div className="md:flex hidden flex-col items-center justify-center">
          <Image
            src="/setup-banner.png"
            width={500}
            height={1000}
            alt="Setup banner"
            className="object-cover"
          />
        </div>
        <div className="border-l flex flex-col items-center justify-center">
          <div className="w-[400px]">
            <h2 className="font-semibold text-center mb-4">Create new store</h2>
            <StoreForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;

import prisma from "@/lib/prisma";
import CustomTable from "@/components/custom-table";
import { brandColumn } from "@/components/brand/column";

const BrandsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const brands = await prisma.brand.findMany({
    where: {
      storeId,
      NOT: {
        isDeleted: true,
      },
    },
  });

  return (
    <div className="container mb-5 md:mb-0">
      <CustomTable
        title="List brand"
        columns={brandColumn}
        dataSource={brands}
      />
    </div>
  );
};

export default BrandsPage;

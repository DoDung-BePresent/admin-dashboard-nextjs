import CustomTable from "@/components/custom-table";
import { productColumn } from "@/components/product/column";
import prisma from "@/lib/prisma";

const ProductsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const products = await prisma.product.findMany({
    where: {
      storeId,
      NOT: {
        isDeleted: true,
      },
    },
    include: {
      images: true,
      brand: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mb-5 md:mb-0">
      <CustomTable
        title="List product"
        columns={productColumn}
        dataSource={products}
      />
    </div>
  );
};

export default ProductsPage;

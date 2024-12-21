import prisma from "@/lib/prisma";
import CustomTable from "@/components/custom-table";
import { categoryColumn } from "@/components/category/column";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const categories = await prisma.category.findMany({
    where: {
      storeId,
      NOT: {
        isDeleted: true,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="container mb-5 md:mb-0">
      <CustomTable
        title="List category"
        columns={categoryColumn}
        dataSource={categories}
      />
    </div>
  );
};

export default CategoriesPage;

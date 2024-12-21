import prisma from "@/lib/prisma";
import CustomTable from "@/components/custom-table";
import { colorColumn } from "@/components/color/column";

const ColorsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  const colors = await prisma.color.findMany({
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
        title="List color"
        columns={colorColumn}
        dataSource={colors}
      />
    </div>
  );
};

export default ColorsPage;

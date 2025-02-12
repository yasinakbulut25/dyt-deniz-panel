"use client";
import { HomeIcon } from "@/icons";
import Card from "@/components/card";
import TableUI from "@/components/table";
import { getSectionsTableData } from "@/utils/table";
import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Loading from "@/components/loading";

export default function Home() {
  const isLoading = useSelector(SELECTORS.getSectionsLoading);
  const sections = useSelector(SELECTORS.getSections);
  if (isLoading) return <Loading />;

  const tableData = getSectionsTableData(sections);
  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <HomeIcon />,
            title: "Başlıklar",
            description: "Oluşturduğunuz tüm başlıkları görebilirsiniz",
          }}
          viewsPerPage={[10]}
          defaultPerPage={10}
        />
      </Card>
    </div>
  );
}

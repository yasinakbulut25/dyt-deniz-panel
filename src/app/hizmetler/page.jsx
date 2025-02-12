"use client";

import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getServicesTableData } from "@/utils/table";
import { GemIcon, PenSquareIcon, PlusIcon } from "@/icons";
import Link from "next/link";

function Services() {
  const isLoading = useSelector(SELECTORS.getServicesLoading);
  const services = useSelector(SELECTORS.getServices);

  if (isLoading) return <Loading />;

  const tableData = getServicesTableData(services);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <GemIcon />,
            title: "Hizmetler",
            description: "Oluşturduğunuz tüm hizmetleri görebilirsiniz",
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={10}
          actionButtonProps={{
            text: "Yeni Ekle",
            as: Link,
            href: "/hizmet-ekle",
            startContent: <PlusIcon width={14} />,
          }}
          emptyContentActions={{
            text: "Yeni Hizmet Ekle",
            as: Link,
            href: "/hizmet-ekle",
            startContent: <PlusIcon width={14} />,
          }}
        />
      </Card>
    </div>
  );
}

export default Services;

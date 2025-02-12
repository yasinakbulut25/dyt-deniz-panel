"use client";

import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getContactsTableData } from "@/utils/table";
import { NotificationIcon, PlusIcon } from "@/icons";
import Link from "next/link";

function Contacts() {
  const isLoading = useSelector(SELECTORS.getContactsLoading);
  const contacts = useSelector(SELECTORS.getContacts);

  if (isLoading) return <Loading />;

  const tableData = getContactsTableData(contacts);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <NotificationIcon />,
            title: "İletişimler",
            description: "Oluşturduğunuz tüm iletişim seçeneklerini görebilirsiniz",
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={10}
          actionButtonProps={{
            text: "Yeni Ekle",
            as: Link,
            href: "/iletisim-ekle",
            startContent: <PlusIcon width={14} />,
          }}
          emptyContentActions={{
            text: "Yeni İletişim Ekle",
            as: Link,
            href: "/iletisim-ekle",
            startContent: <PlusIcon width={14} />,
          }}
        />
      </Card>
    </div>
  );
}

export default Contacts;

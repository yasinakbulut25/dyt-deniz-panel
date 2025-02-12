"use client";

import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getGalleryTableData } from "@/utils/table";
import { ImageIcon, PlusIcon, QuestionCircleIcon } from "@/icons";
import Link from "next/link";

function Questions() {
  const isLoading = useSelector(SELECTORS.getGalleryLoading);
  const images = useSelector(SELECTORS.getGalleryImages);

  if (isLoading) return <Loading />;

  const tableData = getGalleryTableData(images);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <ImageIcon />,
            title: "Foto Galeri",
            description: "Oluşturduğunuz foto galerinizi görebilirsiniz",
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={10}
          actionButtonProps={{
            text: "Yeni Ekle",
            as: Link,
            href: "/galeri-ekle",
            startContent: <PlusIcon width={14} />,
          }}
          emptyContentActions={{
            text: "Yeni Foto Ekle",
            as: Link,
            href: "/galeri-ekle",
            startContent: <PlusIcon width={14} />,
          }}
        />
      </Card>
    </div>
  );
}

export default Questions;

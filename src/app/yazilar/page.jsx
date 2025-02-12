"use client";

import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getBlogsTableData } from "@/utils/table";
import { PenSquareIcon, PlusIcon } from "@/icons";
import Link from "next/link";

function Blogs() {
  const isLoading = useSelector(SELECTORS.getBlogsLoading);
  const blogs = useSelector(SELECTORS.getBlogs);

  if (isLoading) return <Loading />;

  const tableData = getBlogsTableData(blogs);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <PenSquareIcon />,
            title: "Yazılar",
            description: "Oluşturduğunuz tüm yazıları görebilirsiniz",
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={10}
          actionButtonProps={{
            text: "Yeni Ekle",
            as: Link,
            href: "/yazi-ekle",
            startContent: <PlusIcon width={14} />,
          }}
          emptyContentActions={{
            text: "Yeni Yazı Ekle",
            as: Link,
            href: "/yazi-ekle",
            startContent: <PlusIcon width={14} />,
          }}
        />
      </Card>
    </div>
  );
}

export default Blogs;

"use client";

import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Card from "@/components/card";
import TableUI from "@/components/table";
import Loading from "@/components/loading";
import { getQuestionsTableData } from "@/utils/table";
import { PlusIcon, QuestionCircleIcon } from "@/icons";
import Link from "next/link";

function Questions() {
  const isLoading = useSelector(SELECTORS.getQuestionsLoading);
  const questions = useSelector(SELECTORS.getQuestions);

  if (isLoading) return <Loading />;

  const tableData = getQuestionsTableData(questions);

  return (
    <div className="flex flex-col gap-4 my-4">
      <Card>
        <TableUI
          tableData={tableData}
          headerProps={{
            icon: <QuestionCircleIcon />,
            title: "Sorular",
            description: "Oluşturduğunuz tüm soruları görebilirsiniz",
          }}
          viewsPerPage={[5, 10, 15, 20, 25, 30, 40, 50, 100]}
          defaultPerPage={15}
          actionButtonProps={{
            text: "Yeni Ekle",
            as: Link,
            href: "/soru-ekle",
            startContent: <PlusIcon width={14} />,
          }}
          emptyContentActions={{
            text: "Yeni Soru Ekle",
            as: Link,
            href: "/soru-ekle",
            startContent: <PlusIcon width={14} />,
          }}
        />
      </Card>
    </div>
  );
}

export default Questions;

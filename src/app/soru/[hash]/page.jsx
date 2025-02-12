"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { notFound } from "next/navigation";
import SELECTORS from "@/store/selectors";
import Loading from "@/components/loading";
import EditForm from "./editForm";

function EditQuestion({ params }) {
  const [editHash, setEditHash] = useState(null);
  const [paramLoading, setParamLoading] = useState(true);

  const questions = useSelector(SELECTORS.getQuestions);
  const isLoading = useSelector(SELECTORS.getQuestionsLoading);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setEditHash(resolvedParams.hash);
      setParamLoading(false);
    };
    resolveParams();
  }, [params]);

  if (paramLoading || isLoading) return <Loading />;

  const data = questions.find((item) => String(item.hash) === String(editHash));

  if (!data) return notFound();

  return <EditForm editItem={data} />;
}

export default EditQuestion;

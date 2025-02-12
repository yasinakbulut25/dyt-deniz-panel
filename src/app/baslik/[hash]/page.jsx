"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { notFound } from "next/navigation";
import SELECTORS from "@/store/selectors";
import Loading from "@/components/loading";
import EditForm from "./editForm";

function EditSection({ params }) {
  const [editHash, setEditHash] = useState(null);
  const [paramLoading, setParamLoading] = useState(true);

  const sections = useSelector(SELECTORS.getAllSections);
  const isLoading = useSelector(SELECTORS.getSectionsLoading);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setEditHash(resolvedParams.hash);
      setParamLoading(false);
    };
    resolveParams();
  }, [params]);

  if (paramLoading || isLoading) return <Loading />;

  const section = sections.find(
    (section) => String(section.hash) === String(editHash)
  );

  if (!section) return notFound();

  return <EditForm section={section} />;
}

export default EditSection;

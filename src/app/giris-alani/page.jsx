"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import Loading from "@/components/loading";
import EditForm from "./editForm";

function HeroSettings() {
  const [editItem, setEditItem] = useState(null);
  const isLoading = useSelector(SELECTORS.getUserLoading);
  const info = useSelector(SELECTORS.getHeroInfo);

  useEffect(() => {
    if (info) {
      setEditItem(info);
    }
  }, [info]);

  if (!editItem || isLoading) return <Loading />;
  return <EditForm editItem={editItem} />;
}

export default HeroSettings;

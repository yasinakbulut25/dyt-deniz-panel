"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import SignInPage from "@/app/sign-in/page";
import Home from "./Home";
import useDarkMode from "@/hooks/useDarkMode";
import SELECTORS from "@/store/selectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTION_TYPES from "@/store/actionTypes";
import Loading from "@/components/loading";

function Main({ children }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = useSelector(SELECTORS.getUserLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session && status === "authenticated") {
      dispatch({ type: ACTION_TYPES.SIGN_IN.SUCCESS, payload: session });
      dispatch({ type: ACTION_TYPES.INITIALIZE_APP });
    }
  }, [session, status]);

  useEffect(() => {
    if (session && (pathname === "/sign-in" || pathname === "/sign-up")) {
      router.replace("/");
    }
  }, [session, pathname, router]);

  useDarkMode();

  if (!mounted || isLoading || status === "loading") return <Loading />;

  if (pathname === "/sign-in") {
    return <SignInPage />;
  }

  return (
    <main className="content overflow-hidden">
      <Home>{children}</Home>
    </main>
  );
}

export default Main;

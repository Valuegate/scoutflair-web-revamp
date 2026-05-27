"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PitchEditRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/signin/scout/dashboard/localpitches");
  }, [router]);
  return null;
}
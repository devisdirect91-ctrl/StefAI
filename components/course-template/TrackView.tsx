"use client";

import { useEffect } from "react";

export default function TrackView({ courseId }: { courseId: string }) {
  useEffect(() => {
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
  }, [courseId]);
  return null;
}

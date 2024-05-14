"use client";

import { useFormStatus } from "react-dom";

export default function Warte() {
  const status = useFormStatus();
  return status.pending ? "LIKING..." : null;
}

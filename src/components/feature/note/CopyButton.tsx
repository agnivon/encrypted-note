"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import React from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleClick = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <Button
      variant={"secondary"}
      onClick={handleClick}
      className="max-sm:w-full"
    >
      {copied ? (
        <Check className="h-4 w-4 mr-1 text-primary" strokeWidth={2} />
      ) : (
        <Copy className="h-4 w-4 mr-2" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

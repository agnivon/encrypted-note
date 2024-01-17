"use client";

import MotionDivMT from "@/components/transitions/MotionDivMT";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Routes from "@/constants/routes.constants";
import { MAX_CODE_LENGTH } from "@/constants/validation.constants";
import { useRouter } from "next/navigation";
import React from "react";

const GetStarted = () => {
  const router = useRouter();
  const [code, setCode] = React.useState<string>("");
  const handleGetStartedClick = () => {
    if (code) {
      router.push(Routes.note + `/${code}`);
    }
  };
  return (
    <MotionDivMT className="mt-10 flex gap-x-4 justify-center items-center">
      <Input
        className="w-fit text-base py-2"
        placeholder="Type code here"
        value={code}
        onChange={(e) =>
          setCode((v) =>
            e.target.value.length <= MAX_CODE_LENGTH ? e.target.value : v
          )
        }
        onKeyDown={(e) => {
          if (e.key == "Enter") handleGetStartedClick();
        }}
      />
      <Button className="py-2 text-base" onClick={handleGetStartedClick}>
        Get Started
      </Button>
    </MotionDivMT>
  );
};

export default GetStarted;

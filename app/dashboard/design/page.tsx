import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <div className="p-5 text-center">
        <h1 className="mb-5">Buttons</h1>
        <div className="flex justify-center gap-2 flex-wrap">
          <Button variant="default">default</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
        </div>
      </div>
      <div className="p-5 text-center">
        <h1 className="mb-5">Colors</h1>
        <div className="grid grid-cols-4 justify-center gap-2 flex-wrap">
            <div className="px-2 py-1 rounded-md bg-primary">primary</div>
            <div className="px-2 py-1 rounded-md bg-secondary">secondary</div>
            <div className="px-2 py-1 rounded-md bg-accent">accent</div>
            <div className="px-2 py-1 rounded-md bg-destructive">destructive</div>
            <div className="px-2 py-1 rounded-md bg-card">card</div>
            <div className="px-2 py-1 rounded-md bg-muted">muted</div>
            <div className="px-2 py-1 rounded-md bg-border">border</div>
            <div className="px-2 py-1 rounded-md bg-input">input</div>
            <div className="px-2 py-1 rounded-md bg-ring">ring</div>
            <div className="px-2 py-1 rounded-md bg-popover">popover</div>
        </div>
      </div>

    </>
  );
};

export default page;
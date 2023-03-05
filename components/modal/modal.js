"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function modal({
  title,
  description,
  extraDescription,
  visible,
  ok,
  cancel,
}) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

        {extraDescription ? <p>{extraDescription}</p> : ""}

        {ok ? <button onClick={() => setIsOpen(false)}>Ok</button> : ""}
        {cancel ? <button onClick={() => setIsOpen(false)}>Cancel</button> : ""}
      </Dialog.Panel>
    </Dialog>
  );
}

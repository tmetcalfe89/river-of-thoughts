import { ReactNode, useCallback, useState } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen: React.MouseEventHandler<HTMLDetailsElement> = useCallback(
    (e) => {
      e.preventDefault();
      setOpen((p) => !p);
    },
    []
  );

  return (
    <details open={open} onClick={toggleOpen}>
      <summary>{title}</summary>
      {children}
    </details>
  );
}

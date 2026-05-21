import React from "react";

type Props = {
  phone?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function WhatsAppButton({
  phone = "+2348020769766",
  message = "Hello, I would like to inquire about your services.",
  className = "",
  children,
}: Props) {
  const phoneDigits = phone.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  const href = `https://wa.me/${phoneDigits}?text=${encoded}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={"inline-block " + className}
      aria-label="Message us on WhatsApp"
    >
      {children ?? (
        <span className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12 .5C5.65.5.9 5.25.9 11.6c0 2.03.54 4.02 1.56 5.78L.5 23.5l6.4-1.69A11.92 11.92 0 0 0 12 23.5c6.35 0 11.1-4.75 11.1-11.9 0-3.19-1.24-6.19-2.58-8.12zM12 21.5c-1.6 0-3.16-.38-4.56-1.1l-.33-.18-3.8 1.01 1.02-3.7-.2-.37A9.17 9.17 0 0 1 2.9 11.6C2.9 6.4 7.1 2.5 12 2.5c2.45 0 4.73.9 6.46 2.53A8.38 8.38 0 0 1 20.4 11.6c0 4.9-4.2 8-8.4 9.9-.77.3-1.57.5-2.4.5z" />
            <path d="M17.1 14.1c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.3-.3.2-.6.1-1.8-.8-3-1.7-4.2-3.3-.3-.4 0-.6.2-.8.1-.1.3-.3.5-.5.2-.2.3-.3.5-.5.2-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.3-.2-.6-.4-.5-.6-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.3-.3.2-1 1-1 2.4 0 1.4 1 2.7 1.1 2.8.1.2 1.9 3 4.6 4.2 3.2 1.4 3.2 1 3.8 1 .5 0 1.6-.7 1.8-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.2-.6-.3z" />
          </svg>
          <span>{children ?? "Message on WhatsApp"}</span>
        </span>
      )}
    </a>
  );
}

import { useState, useEffect, useRef } from "react";

interface AutoResizingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  minWidth?: number;
}

const AutoResizingInput = ({
  value,
  onChange,
  placeholder,
  className,
  minWidth = 150,
  type = "text",
  style,
  ...props
}: AutoResizingInputProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(minWidth);

  useEffect(() => {
    if (spanRef.current) {
      const newWidth = spanRef.current.offsetWidth;
      setInputWidth(newWidth + 4);
    }
  }, [value, placeholder]);

  const defaultClasses = "p-[2px] outline-gray-400 rounded-sm";
  const inputClassName = `${defaultClasses} ${className || ""}`.trim();

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
        style={{ width: inputWidth, ...style }}
        {...props}
      />
      <span
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
          whiteSpace: "pre",
          padding: 0,
          border: 0,
          margin: 0,
          fontSize: "inherit",
          fontFamily: "inherit",
        }}
      >
        {value || placeholder || ""}
      </span>
    </div>
  );
};

export default AutoResizingInput;

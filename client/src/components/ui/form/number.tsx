import { forwardRef } from "react";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { useSettings } from "@contexts/settings.context";
import { themes } from "@themes/index";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
  className?: string;
  inputClassName?: string;
  value: number;
  step?: number;
  minimum?: number;
  maximum?: number;
  onValueChange?: (value: number) => void;
};

const NumberInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      className,
      inputClassName = "",
      value = 0,
      step = 1,
      minimum = undefined,
      maximum = undefined,
      onValueChange = () => {},
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation("common");
    const website = useSettings() as Record<string, any>;

    const minusStep = () => {
      let newValue = Number(String(Number(value) - Number(step)));
      if (typeof minimum === "number") {
        newValue = Math.max(minimum, newValue);
      }
      onValueChange(Math.round(newValue / step) * step);
    };
    const plusStep = () => {
      let newValue = Number(String(Number(value) + Number(step)));
      if (typeof maximum === "number") {
        newValue = Math.min(maximum, newValue);
      }
      onValueChange(Math.round(newValue / step) * step);
    };
    const changeValue = (inputValue: string) => {
      let newValue = Number(inputValue) || 0;
      if (typeof minimum === "number") {
        newValue = Math.max(minimum, newValue);
      }
      if (typeof maximum === "number") {
        newValue = Math.min(maximum, newValue);
      }
      onValueChange(newValue);
    };
    return (
      <div className={className}>
        <label className="flex text-13px">
          <button
            className="rounded-l text-white w-[32px] flex-shrink-0"
            style={{
              backgroundColor: themes[website.themeColor || "base"].accent400,
            }}
            onClick={minusStep}
            disabled={typeof minimum !== "undefined" && value <= minimum}
          >
            -
          </button>
          <input
            type="number"
            ref={ref}
            {...props}
            className={classNames(
              "border-y-2 border-accent flex-grow w-full text-center appearance-none bg-light-300 dark:bg-dark-100 px-2 py-1 text-13px text-dark border-0 focus:ring-0 ring-transparent placeholder:text-dark-900 dark:text-light dark:placeholder:text-dark-700 outline-0",
              inputClassName
            )}
            value={value}
            onChange={(event) => {
              changeValue(event.target.value);
            }}
            onWheel={(event) => {
              event.currentTarget.blur();
            }}
          />
          <button
            className="rounded-r text-white w-[32px] flex-shrink-0"
            style={{
              backgroundColor: themes[website.themeColor || "base"].accent400,
            }}
            onClick={plusStep}
            disabled={typeof maximum !== "undefined" && value >= maximum}
          >
            +
          </button>
        </label>
        {error && (
          <span role="alert" className="block pt-2 text-xs text-error">
            {t(error)}
          </span>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";
export default NumberInput;

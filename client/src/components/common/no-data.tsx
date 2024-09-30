import cn from "classnames";
import { useTranslation } from "next-i18next";

interface Props {
  text?: string;
  type: 'data' | 'order' | 'request';
  className?: string;
}

const NoData: React.FC<Props> = (props) => {
  const { type = "data" } = props;
  const { t } = useTranslation("common");
  return (
    <div className={cn("flex flex-col items-center", props.className)}>
      <div className="w-full flex items-center justify-center">
        <img
          src={`/no-${type}.svg`}
          alt={props.text ? t(props.text) : t("text-no-result-found")}
          className="w-full h-full object-contain"
        />
      </div>
      {props.text && (
        <h3 className="w-full text-center text-sm font-semibold text-body my-4">
          {t(props.text)}
        </h3>
      )}
    </div>
  );
};

export default NoData;

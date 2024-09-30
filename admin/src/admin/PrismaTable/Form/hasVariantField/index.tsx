import VariationOptions from "./variationOptions";
import Variations from "./variations";

export default function ProductVariableForm({
  field,
  value,
  error,
  register,
  setValue,
  watch,
  control,
  disabled,
  ui,
  custom,
  t,



  getValues,

}) {

  return (
    <div className="w-full">
      <Variations getValues={getValues} t={t} custom={custom} ui={ui} field={field} value={value} error={error} register={register} setValue={setValue} watch={watch} control={control} disabled={disabled} />
      <VariationOptions getValues={getValues} t={t} custom={custom} ui={ui} field={field} value={value} error={error} register={register} setValue={setValue} watch={watch} control={control} disabled={disabled} />
    </div>
  );
}

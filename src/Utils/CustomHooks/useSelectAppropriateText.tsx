import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/store/store";

const useSelectAppropriateText = (
  englishString: string,
  czechString: string
) => {
  const isDefaultLanguage = useSelector(
    (state: StoreType) => state.themeState.isDefaultLanguage
  );
  return isDefaultLanguage ? englishString : czechString;
};

export default useSelectAppropriateText;

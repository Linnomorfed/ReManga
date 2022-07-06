import { FiltersDataResponse } from '../../models/IFilters';
import { ResponseManga } from '../../models/IManga';

export interface MangaPanelProps {
  data?: ResponseManga;
  filters: FiltersDataResponse;
}

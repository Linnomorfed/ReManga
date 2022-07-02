import { FiltersDataResponce } from '../../models/IFilters';
import { ResponceManga } from '../../models/IManga';

export interface MangaPanelProps {
  data?: ResponceManga;
  filters: FiltersDataResponce;
}

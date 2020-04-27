import { crudControllers } from '../../utils/crud';
import linkModel from './link.model';

export default {
  ...crudControllers(linkModel),
};

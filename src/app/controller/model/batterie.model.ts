import {Station} from './station.model';

export class Batterie {
  public id: number | undefined;
  public min: number | undefined;
  public nre: number | undefined;
  public max: number | undefined;
  public station = new Station();
}

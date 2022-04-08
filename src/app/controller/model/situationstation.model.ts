import {Station} from './station.model';

export class Situationstation {
  public id: number = Number();
  public pluie: number = Number();
  public neige: number = Number();
  public niveauEau: number = Number();
  public debit: number = Number();
  public hauteurmax: number = Number();
  public coteAlerte: number = Number();
  public cotePreAlerte: number = Number();
  public debitMax: number = Number();
  public heurDebitMax: string = String();
  public debitPreAlerte: number = Number();
  public debitAlerte: number = Number();
  public date: Date | undefined;
  public station = new Station();
}

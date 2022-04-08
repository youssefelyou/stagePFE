import {Barrage} from './barrage.model';
import {Observation} from './observation.model';

export class SituationBarrage {
  public id: number | undefined;
  public debit: number =  Number();
  public hauteurActuel: number | undefined;
  public volumeActuel: number =  Number();
  public volumeNormal: number  =  Number();
  public tauxRemplissage: number  =  Number();
  public pluie: number = Number();
  public neige: number | undefined;
  public date: Date = new Date();
  public turbinage: number | undefined;
  public irrigation: string | undefined;
  public vidangeFond: string | undefined;
  public evacuateurCrues: string | undefined;
  public turbidite: string | undefined;
  public bac: number = Number();
  public barrage = new Barrage();
  public observation: Observation = new Observation();
}

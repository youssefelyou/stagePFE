import {DigueDeCol} from './digue-de-col.model';
import {EvacuateurCrue} from './evacuateur-crue.model';
import {Hydrologie} from './hydrologie.model';
import {Retenue} from './retenue.model';
import {VidangeFond} from './vidange-fond.model';
import {Gardien} from './gardien.model';

export class Barrage {
  public id: number | undefined;
  public ire: string = String();
  public name: string =  String();
  public type: string | undefined;
  public type1: string | undefined;
  public cr: string | undefined;
  public province: string = String();
  public sousBassin: string = String();
  public priseRestitution: string | undefined;
  public oued: string = String();
  public hauteurSurFondation: number | undefined;
  public niveauCrete: number | undefined;
  public longueurEnCrete: number | undefined;
  public largeurEnCrete: number | undefined;
  public nmbrePrises: number | undefined;
  public diametreConduite: number | undefined;
  public dateMiseService: Date | undefined;
  public digueDeCol = new DigueDeCol();
  public evacuateurCrues = new EvacuateurCrue();
  public hydrologie = new Hydrologie();
  public retenue = new Retenue();
  public vidangeFond = new VidangeFond();
  public gardien = new Gardien();
  public x: number | undefined;
  public y: number | undefined;
  public z: number | undefined;
}

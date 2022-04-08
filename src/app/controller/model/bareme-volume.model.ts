import {Barrage} from './barrage.model';

export class BaremeVolume {
  public id: number = Number();
  public cote: number | undefined = Number();
  public a0: number = Number();
  public a1: number = Number();
  public a2: number = Number();
  public a3: number = Number();
  public a4: number = Number();
  public a5: number = Number();
  public a6: number = Number();
  public a7: number = Number();
  public a8: number = Number();
  public a9: number = Number();
  public barrage: Barrage = new Barrage();
}

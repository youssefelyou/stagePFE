import {Gardien} from './gardien.model';

export class Station {

  public id: number | undefined;
    public nrePoste: string | undefined;
    public  nire: string = String();
    public  nomStation: string = String();
    public  province: string | undefined;
    public  commune: string | undefined;
    public  carte: string | undefined;
    public  statutFoncier: string | undefined;
    public  dateMiseEnService: Date | undefined;
    public  oued: string | undefined;
    public  surface: number | undefined;
    public  nature: string | undefined;
    public  sousbassin: string | undefined;
    public localiteplusproche: string | undefined;
    public  typeStation: string | undefined;
    public gardien = new Gardien();
    public x: number | undefined;
    public y: number | undefined;
    public z: number | undefined;
    public  teletransmise: string | undefined;
    public  acces: string | undefined;


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IGetPokemonsListResponse, IPokemonName, PokemonModel, PokemonsContainer } from '../models/pokemon.model';
import { delay, flatMap, map, mapTo, mergeMap, startWith } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, concat, of, Subject } from 'rxjs';
import { IPokemonIdResponse } from '../models/pokemon-id.model';
import { IEncounters, IGeneration } from '../models/pokemon-encounters.model';

@Injectable()
export class PokimonHttpService {

  pokemons$ = new BehaviorSubject<PokemonsContainer>(new PokemonsContainer());

  container: PokemonsContainer;

  constructor(private httpClient: HttpClient) { }

  /**
   * @description get pokemons => get pokemons info by loaded id
   * @param size amount of data to load
   */
  getData$(size: number): Observable<PokemonsContainer> {

    const list$ = this.getPokemmonsList$(size);

    this.container = new PokemonsContainer();

    list$.pipe
      (
        mergeMap((pok: IPokemonName[]) => pok),
        mergeMap((pokItem: IPokemonName) => {
          const id = this.getPokemonID(pokItem.url);
          return this.getPokemonById$(+id);
        })
      )
      .subscribe((data: IPokemonIdResponse) => {

        this.container.pokemons.push(new PokemonModel(data));
        this.container.pokemons.sort((a, b) => a.id - b.id);
        this.pokemons$.next(this.container);

      }, (err) => {
        console.log(err);
      },
        () => this.pokemons$.complete()
      );

    return this.pokemons$;
  }

  /**
   * @description get model list
   */
  getPokemmonsList$(size: number): Observable<IPokemonName[]> {
    return this.httpClient.get<IGetPokemonsListResponse>(`${environment.getPokimonsListApi}${size}`).pipe(
      map((data: IGetPokemonsListResponse) => {
        return data.results;
      })
    );
  }
  /**
   * @description get model info by id
   */
  getPokemonById$(pokimonId: number): Observable<IPokemonIdResponse> {
    return this.httpClient.get<IPokemonIdResponse>(`${environment.getPokimonByIdApi}${pokimonId}/`);
  }
  /**
   * @description get model id from url
   */
  getPokemonID(url: string): string {
    const spliter: string[] = url.split('/', 7);
    const id = spliter[spliter.length - 1];
    return id;
  }

  /**
   * @description get encounters & versions of model
   * @returns observable of model included versions & encounters data
   */
  getDetailsData$(id: number, pokemon: PokemonModel): Observable<PokemonModel> {
    const encounters$ = this.getPokemonEncounters$(id);
    const versions$ = this.getPokemonVersions$(id);
    const pokemon$ = new Subject<PokemonModel>();

    combineLatest([versions$, encounters$]).pipe(map(([versions$, encounters$]) => ({ versions: versions$, encounters: encounters$ })))
      .subscribe((data: {
        versions: IGeneration,
        encounters: IEncounters[]
      }) => {
        pokemon = { ...pokemon, ...{ encounters: data.encounters, version: data.versions } };
        pokemon$.next(pokemon);
      }, (err) => {
        console.log(err);
      }, () => {
        return pokemon$.complete();
      });

    return pokemon$;
  }
  /**
   * @description get encounters data
   */
  getPokemonEncounters$(id: number): Observable<IEncounters[]> {
    return this.httpClient.get<IEncounters[]>(`${environment.getPokimonEncountersApi}${id}/encounters`);
  }
  /**
   * @description get versions data
   */
  getPokemonVersions$(id: number): Observable<IGeneration> {
    return this.httpClient.get<IGeneration>(`${environment.getPokimonBVersionsApi}${id}`);
  }

}



import { LocationData } from '../types';
import { LOCATIONS } from '../data/locations';
import { ENCOUNTER_CHANCE_PERCENT } from '../config';

export class GameMap {
  locations: LocationData[];
  currentLocation: number;

  constructor() {
    this.locations = LOCATIONS.map(loc => ({
      ...loc,
      connections: { ...loc.connections },
      wildPokemons: [...loc.wildPokemons],
    }));
    this.currentLocation = 0;
  }

  getCurrentLocation(): LocationData {
    return this.locations[this.currentLocation];
  }

  getCurrentLocationIndex(): number {
    return this.currentLocation;
  }

  tryMove(direction: string): boolean {
    const current = this.locations[this.currentLocation];
    if (!(direction in current.connections)) return false;
    this.currentLocation = current.connections[direction];
    return true;
  }

  getAvailableDirections(): string[] {
    return Object.keys(this.locations[this.currentLocation].connections);
  }

  shouldEncounter(): boolean {
    const current = this.locations[this.currentLocation];
    if (current.wildPokemons.length === 0) return false;
    return Math.random() * 100 < ENCOUNTER_CHANCE_PERCENT;
  }

  getWildPokemons(): string[] {
    return this.locations[this.currentLocation].wildPokemons;
  }
}

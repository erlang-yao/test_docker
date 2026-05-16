import { Router, Request, Response } from 'express';
import { sessionMiddleware } from '../middleware/session';
import { LOCATION_COORDS } from '../data/locations';
import { MapLocation } from '../types';

const router = Router();

// GET /api/map/current
router.get('/current', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const currentIdx = session.map.getCurrentLocationIndex();
  const current = session.map.getCurrentLocation();

  const allLocations: MapLocation[] = session.map.locations.map((loc, i) => ({
    index: i,
    name: loc.name,
    x: LOCATION_COORDS[i]?.x ?? 0,
    y: LOCATION_COORDS[i]?.y ?? 0,
    connections: Object.entries(loc.connections).map(([dir, toIdx]) => ({
      direction: dir,
      toIndex: toIdx,
    })),
    wildPokemons: loc.wildPokemons,
  }));

  res.json({
    currentLocationIndex: currentIdx,
    locationName: current.name,
    locationDescription: current.description,
    availableDirections: session.map.getAvailableDirections(),
    wildPokemons: session.map.getWildPokemons(),
    allLocations,
  });
});

export default router;

import { Tile } from '../Tile';
import { TileGrid } from '../TileGrid';

export function LifeSection() {
  return (
    <TileGrid>
      <Tile span="wide" className="text-white" />
      <Tile span="medium" />
      <Tile span="medium" />
    </TileGrid>
  );
}

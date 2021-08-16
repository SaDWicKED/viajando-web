export class BusSeat {
  seatNumber: number;
  seatState: number;
  blockTime: string | undefined;

  constructor(seatNumber: number, seatState: number, blockTime?: string) {
    this.seatNumber = seatNumber;
    this.seatState = seatState;
    this.blockTime = blockTime;
  }

  setBlockTime(time: string): void {
    this.blockTime = time;
  }

  getBlockTime(): string | undefined {
    return this.blockTime;
  }

}

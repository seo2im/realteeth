export class WeatherError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
export class CurrentLocationError extends WeatherError {
  constructor() {
    super('현재 위치를 가져오는 데 실패했습니다.');
  }
}
export class GeocodeError extends WeatherError {
  constructor() {
    super('해당 장소의 정보가 제공되지 않습니다.');
  }
}
export class WeatherDataError extends WeatherError {
  constructor() {
    super('해당 장소의 정보가 제공되지 않습니다.');
  }
}

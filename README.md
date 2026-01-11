#

## Get Started

### Build

```bash
./realteeth.sh build
./realteeth.sh sync
```

### RUN

```bash
./realteeth.sh run
```

### TroubleShooting

- **Build RUN pnpm install Error**

  - node_modules 삭제 후 재시도

- **pnpm store Error**

  - pnpm install 실행 후 재시도

  - 혹은 아래 명령어로 컨테이너 내부 접속 후 시도

```bash
./realteeth.sh exec
```

## 구현 기능

1. 현재 위치 날씨 정보 알려주기

- Geolocation Web API, vwworld Geocorder API, Open-Meteo API

2. 지정 장소 날씨 정보 알려주기

- vworld Geocorder API, Open-Meteo API

3. 지정 장소 즐겨찾기 추가/삭제

- localStorage

## 기술 스택

### 날씨 API

대상: 공공데이터포탈, OpenWeatherMap, Open-Meteo

**공공데이터포탈**

- 요구 데이터 한번에 포함 불가(초단기예보 + 단기예보 2중 API 사용 필요)
- 데이터가 일반적이지 않은 기상 코드를 사용하여 구분 어려움
- 당일 기온 데이터를 기본적으로 3시간단위로 제공

**OpenWeatherMap**

- 가장 빠르게 요구 데이터를 일괄 확인할 수 있는 API(4일 데이터 API)는 유료 옵션

**Open_Meteo(선택)**

- 데이터 구조 직관적
- 무료
- 별도의 서비스 신청 필요없음

### Geocoorder

**vwwold**

- 요청 및 응답 구조 직관적
- 공공 데이터 포탈제공이라 국내 주소에 적합
- 주소 -> geocode / geocode -> 주소 2 기능 모두 제공

### Localstorage

즐겨찾기 세이브를 위한 기능 필요

**cookie**

**localStorage**

**client-save(cookie, localstorage) + server**

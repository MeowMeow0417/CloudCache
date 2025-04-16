import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  Snowflake,
  Droplets,
} from "lucide-react";

export function getWeatherIcon(code: number) {
  switch (code) {
    case 1000:
      return Sun; // Sunny / Clear
    case 1003:
      return CloudSun; // Partly cloudy
    case 1006:
    case 1009:
    case 1030:
    case 1135:
    case 1147:
      return Cloud; // Cloudy / Overcast / Mist / Fog
    case 1063:
    case 1150:
    case 1153:
    case 1168:
    case 1171:
      return CloudDrizzle; // Drizzle or patchy rain
    case 1180:
    case 1183:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1240:
    case 1243:
    case 1246:
      return CloudRain; // Light to heavy rain / showers
    case 1066:
    case 1069:
    case 1072:
    case 1204:
    case 1207:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1237:
    case 1249:
    case 1252:
    case 1255:
    case 1258:
    case 1261:
    case 1264:
      return CloudSnow; // Snow / sleet / ice pellets
    case 1114:
    case 1117:
      return Snowflake; // Blizzard / blowing snow
    case 1087:
    case 1273:
    case 1276:
    case 1279:
    case 1282:
      return CloudLightning; // Thunder
    default:
      return Sun; // Fallback
  }
}

import mongoose from 'mongoose'
const openWeatherAPIMockData = {
  coord: {
    lon: -75.5174,
    lat: 5.0689,
  },
  weather: [
    {
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10n',
    },
  ],
  base: 'stations',
  main: {
    temp: 286.28,
    feels_like: 286.18,
    temp_min: 286.28,
    temp_max: 286.28,
    pressure: 1015,
    humidity: 97,
    sea_level: 1015,
    grnd_level: 795,
  },
  visibility: 10000,
  wind: {
    speed: 2.35,
    deg: 108,
    gust: 1.65,
  },
  rain: {
    '1h': 0.16,
  },
  clouds: {
    all: 97,
  },
  dt: 1656028875,
  sys: {
    country: 'CO',
    sunrise: 1655981507,
    sunset: 1656026201,
  },
  timezone: -18000,
  id: 3675443,
  name: 'Manizales',
  cod: 200,
};
export interface ResponseObjProps {
  coord: object;
  weather: object[];
  base: string;
  main: object;
  visibility: number;
  wind: object;
  rain: object;
  clouds: object;
  dt: number;
  sys: object;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface ResponseObjPropsModelInterface extends mongoose.Model<ResponseObjPropsDoc> {
  build(attr: ResponseObjProps): ResponseObjPropsDoc
}

interface ResponseObjPropsDoc extends mongoose.Document {
  coord: object;
  weather: object[];
  base: string;
  main: object;
  visibility: number;
  wind: object;
  rain: object;
  clouds: object;
  dt: number;
  sys: object;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const responseObjSchema = new mongoose.Schema({
  coord:  Object,
  weather: Object,
  base:   String,
  main:  Object,
  visibility: Number,
  wind : Object,
  rain : Object,
  clouds : Object,
  dt : Number,
  sys : Object,
  id: Number,
  name: String,
  cod: Number

})

responseObjSchema.statics.build = (attr: ResponseObjProps) => {
  return new ResponseObj(attr);
}

const ResponseObj = mongoose.model<ResponseObjPropsDoc, ResponseObjPropsModelInterface>('responseobj', responseObjSchema)

ResponseObj.build(openWeatherAPIMockData)

export default ResponseObj; 





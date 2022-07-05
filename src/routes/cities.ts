import express, { Request, Response } from "express";
import { ResponseObj } from "../../models";
import { checkCorrectCommingData } from "../utils";
const router = express.Router();
const url = "/api/cityWeatherData";

/**Weather API */
/**get all the city and weather data */
router.get(url, async (req: Request, res: Response) => {
    const cityWeatherData = await ResponseObj.find({});
    return res.status(200).send(cityWeatherData);
});
/**create new city weather data in the database*/
router.post(url, async (req: Request, res: Response) => {
    const {
        coord,
        weather,
        base,
        main,
        visibility,
        wind,
        rain,
        clouds,
        dt,
        sys,
        timezone,
        id,
        name,
        cod,
    } = req.body;
    const passed = checkCorrectCommingData([
        coord,
        weather,
        base,
        main,
        visibility,
        wind,
        rain,
        clouds,
        dt,
        sys,
        timezone,
        id,
        name,
        cod,
    ]);
    if (passed) {
        const cityWeatherData = ResponseObj.build({
            coord,
            weather,
            base,
            main,
            visibility,
            wind,
            rain,
            clouds,
            dt,
            sys,
            timezone,
            id,
            name,
            cod,
        });
        await cityWeatherData.save((err, data) => {
            if (err)
                res
                    .status(500)
                    .send(
                        "Error: 500. Internal Server Error, the data could not be saved. " +
                        err
                    );
            res.status(201).send(data);
        });
    } else {
        return res
            .status(422)
            .send(
                "Error: 422. Unprocessable Entity. The response from the API does not have a correct schema."
            );
    }
});
/**update city weather data in the database*/
router.patch(url, async (req: Request, res: Response) => {
    ResponseObj.findByIdAndUpdate(req.body.id, req.body.newData)
        .then((data) => res.status(200).send(data))
        .catch((err) =>
            res.status(404).send("Error: 404. Entity not found. " + err)
        );
});

/**delete all or a single city weather data in the database*/
router.delete(url, async (req: Request, res: Response) => {
    if (req.body.id === "deleteAll") {
        ResponseObj.deleteMany({})
            .then((data) => res.status(200).send(data))
            .catch((err) =>
                res.status(404).send("Error: 404. Entity not found. " + err)
            );
    } else {
        ResponseObj.findByIdAndDelete(req.body.id)
            .then((data) => res.status(200).send(data))
            .catch((err) =>
                res.status(404).send("Error: 404. Entity not found. " + err)
            );
    }
});
export default router;

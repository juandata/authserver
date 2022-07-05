
import express, { Request, Response } from 'express'
import {  UserData } from '../../models'
import bcrypt from 'bcryptjs';
import {tokenGenerator} from '../utils';
const router = express.Router()

const url = '/api/cityWeatherData/auth';
/**Auth Register API */
/**Get all users */
router.get(url, async (req: Request, res: Response) => {
  const cityWeatherDataNewUser = await UserData.find({});
  return res.status(200).send(cityWeatherDataNewUser);
})
/**Get a single user */
router.post(url + "/signin", async (req: Request, res: Response) => {
  const {email, password } = req.body;
  const cityWeatherDataUser = await UserData.findOne({ email: email }).exec();
  if(cityWeatherDataUser !== null ){
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await bcrypt.compare(password, cityWeatherDataUser.passwordsalt);
    if(result){
      const token = tokenGenerator(cityWeatherDataUser.passwordsalt);
      return res.json({
        token: `Bearer ${token}`,
      });
    } else {
      return res.status(404).send("Please check your email or password."); 
    }
   
  }
  return res.status(404).send("The requested resource was not found.");  
 // const cityWeatherDataNewUser = await UserData.find({});
   
})
/**Create a new user */
router.post(url + "/signup", async (req: Request, res: Response) => {
  const {firstname, lastname, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordsalt = await bcrypt.hash(password, salt); 
      const cityWeatherDataNewUser = UserData.build({ firstname,lastname, email, passwordsalt })
      await cityWeatherDataNewUser.save((err, data)=>{
        if (err) res.status(500).send("Error: 500. Internal Server Error, the data could not be saved. " + err);
        res.status(201).send("Account registered, you can sign in now using the Sign in page");
      })
 
});

/**update a user*/
router.patch(url, async (req: Request, res: Response) => {
  UserData.findByIdAndUpdate(req.body.id, req.body.newData)
      .then((data) => res.status(200).send(data))
      .catch((err) =>
          res.status(404).send("Error: 404. Entity not found. " + err)
      );
});

/**delete a user database*/
router.delete(url, async (req: Request, res: Response) => {
  if (req.body.id === "deleteAll") {
    UserData.deleteMany({})
          .then((data) => res.status(200).send(data))
          .catch((err) =>
              res.status(404).send("Error: 404. Entity not found. " + err)
          );
  } else {
    UserData.findByIdAndDelete(req.body.id)
          .then((data) => res.status(200).send(data))
          .catch((err) =>
              res.status(404).send("Error: 404. Entity not found. " + err)
          );
  }
});


export default router;


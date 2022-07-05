import mongoose from "mongoose";
const userDataAPIMockData = {
  firstname: "user",
  lastname: "test",
  email: "usertest@test.com",
  passwordsalt: "123",
};
export interface UserDataProps {
  firstname: string;
  lastname: string;
  email: string;
  passwordsalt: string;
}

interface UserDataPropsModelInterface extends mongoose.Model<UserDataDoc> {
  build(attr: UserDataProps): UserDataDoc;
}

interface UserDataDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  passwordsalt: string;
}

const userDataSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  passwordsalt: String,
});

userDataSchema.statics.build = (attr: UserDataProps) => {
  return new UserData(attr);
};

const UserData = mongoose.model<UserDataDoc, UserDataPropsModelInterface>(
  "userdata",
  userDataSchema
);

UserData.build(userDataAPIMockData);

export default UserData;

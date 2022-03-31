import mongoose from "mongoose";

mongoose.Promise = global.Promise;
delete mongoose.connection.models['client'];

const ClientSchema = new mongoose.Schema({

  user_Id : String,
  full_name : String,
  last_name : String,
  email : String,
  phone : String,
  address : String,

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.models.Client || mongoose.model("client", ClientSchema);

export default Client;

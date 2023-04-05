import { Schema, model } from "mongoose";
import { Employeel } from "../interfaces/EmployeeI";

const employeeSchema = new Schema<Employeel>({
  firstName: { type: String, required: true, allowNull: false},
  lastName: { type: String, required: true, allowNull: false},
  document: { type: String, required: true, allowNull: false},
  fone: { type: String},
  office: { type: String},
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, allowNull: false}
})

const EmployeeModal = model<Employeel>("Employee", employeeSchema);

export default EmployeeModal;

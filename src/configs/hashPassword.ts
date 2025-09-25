import bcrypt from "bcrypt";
import { Schema, HookNextFunction } from "mongoose";

const saltRounds = 10;

export function applyPasswordHashing(schema: Schema) {
  // pre-save hook
  schema.pre("save", async function (next: HookNextFunction) {
    const doc: any = this;
    if (!doc.isModified("password")) return next();

    try {
      doc.password = await bcrypt.hash(doc.password, saltRounds);
      next();
    } catch (err) {
      next(err as any);
    }
  });

  // pre-update hook (for findOneAndUpdate / findByIdAndUpdate)
  schema.pre("findOneAndUpdate", async function (next: HookNextFunction) {
    const update: any = this.getUpdate();
    if (!update.password) return next();

    try {
      update.password = await bcrypt.hash(update.password, saltRounds);
      next();
    } catch (err) {
      next(err as any);
    }
  });
}
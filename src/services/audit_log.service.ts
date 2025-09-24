// audit_log.service.ts
import AuditLog from '../models/audit_log.model';

export const findAll = async () => {
  return await AuditLog.find();
};

export const findById = async (id: string) => {
  return await AuditLog.findById(id);
};

export const create = async (data: any) => {
  const doc = new AuditLog(data);
  return await doc.save();
};

export const update = async (id: string, data: any) => {
  return await AuditLog.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await AuditLog.findByIdAndDelete(id);
};

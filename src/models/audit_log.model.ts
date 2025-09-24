// audit_log.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IAuditLog extends Document {
  log_id?: number;
  user_id: number;
  action: string;
  table_name?: string;
  record_id?: number;
  before_state?: any;
  after_state?: any;
  created_at?: Date;
}

const audit_logSchema = new Schema<IAuditLog>(
  {
    log_id: { type: Number },
    user_id: { type: Number },
    action: { type: String },
    table_name: { type: String, required: false },
    record_id: { type: Number, required: false },
    before_state: { type: Schema.Types.Mixed, required: false },
    after_state: { type: Schema.Types.Mixed, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const AuditLog = model<IAuditLog>('AuditLog', audit_logSchema);
export default AuditLog;

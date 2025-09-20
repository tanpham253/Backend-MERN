// notifications.model.ts
import { Schema, model, Document } from 'mongoose';

export interface INotifications extends Document {
  notification_id?: number;
  customer_id: number;
  message: string;
  is_read?: boolean;
  created_at?: Date;
}

const notificationsSchema = new Schema<INotifications>(
  {
    notification_id: { type: Number },
    customer_id: { type: Number },
    message: { type: String },
    is_read: { type: Boolean, required: false },
    created_at: { type: Date, required: false },
  },
  { timestamps: false }
);

const Notifications = model<INotifications>('Notifications', notificationsSchema);
export default Notifications;

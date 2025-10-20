import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISolution extends Document {
  title: string;
  category: 'product' | 'service' | 'scientific_article' | 'machinery' | 'irrigation';
  subcategory?: string;
  details?: string;
  priceDollar?: number;
  link?: string;
  publishDate: Date;
  starRating?: number;
  ownerContact?: {
    email?: string;
    phone?: string;
    other?: string;
  };
  dataColeta?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SolutionSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['product', 'service', 'scientific_article', 'machinery', 'irrigation'], required: true },
  subcategory: { type: String },
  details: { type: String },
  priceDollar: { type: Number },
  link: { type: String },
  publishDate: { type: Date, default: Date.now },
  dataColeta: { type: String },
  starRating: { type: Number, min: 0, max: 5 },
  ownerContact: {
    email: { type: String },
    phone: { type: String },
    other: { type: String }
  }
}, { timestamps: true });

export const SolutionModel = 
  (mongoose.models.Solution as Model<ISolution>) || mongoose.model<ISolution>('Solution', SolutionSchema);

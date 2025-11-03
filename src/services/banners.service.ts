import Banner, { IBanner } from "../models/banners.model";

export const BannerService = {
  async getAll(): Promise<IBanner[]> {
    return await Banner.find().sort({ createdAt: -1 });
  },

  async getById(id: string): Promise<IBanner | null> {
    return await Banner.findById(id);
  },

  async create(data: Partial<IBanner>): Promise<IBanner> {
    const banner = new Banner(data);
    return await banner.save();
  },

  async update(id: string, data: Partial<IBanner>): Promise<IBanner | null> {
    return await Banner.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string): Promise<IBanner | null> {
    return await Banner.findByIdAndDelete(id);
  },
};